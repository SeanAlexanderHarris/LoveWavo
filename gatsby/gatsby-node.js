import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnStoreItemsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const storeItemPageTemplate = path.resolve(
    './src/templates/StoreItemPageTemplate.js'
  );

  // 2. Query all pizzas
  const { data } = await graphql(`
    query MyQuery {
      storeItems: allSanityItem {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. Loop over each pizza and create a page for it
  data.storeItems.nodes.forEach((storeItem) => {
    console.log(
      `Creating a page for ${storeItem.name} at store/${storeItem.slug.current}`
    );

    actions.createPage({
      path: `store/${storeItem.slug.current}`,
      component: storeItemPageTemplate,
      context: {
        slug: storeItem.slug.current,
      },
    });
  });
}

async function turnItemTagsIntoPages({ graphql, actions }) {
  console.log('Creating item tags page...');

  // 1. Get a template for this page
  const storeItemPageTemplate = path.resolve('./src/pages/store.js');

  // 2. Query all toppings
  const { data } = await graphql(`
    query MyQuery {
      itemTags: allSanityItemTag {
        nodes {
          name
          id
        }
      }
    }
  `);

  // 4. Pass item tag data to store.js
  data.itemTags.nodes.forEach((itemTag) => {
    actions.createPage({
      path: `itemtags/${itemTag.name.replace(/\s/g, '')}`,
      component: storeItemPageTemplate,
      context: {
        itemTag: itemTag.name,
        itemTagRegex: `/${itemTag.name}/i`,
      },
    });
  });
}

// async function turnPizzasIntoPages({ graphql, actions }) {
//   // 1. Get a template for this page
//   const pizzaPageTemplate = path.resolve(
//     './src/templates/PizzaPageTemplate.js'
//   );

//   // 2. Query all pizzas
//   const { data } = await graphql(`
//     query MyQuery {
//       pizzas: allSanityPizza {
//         nodes {
//           name
//           slug {
//             current
//           }
//         }
//       }
//     }
//   `);

//   // 3. Loop over each pizza and create a page for it
//   data.pizzas.nodes.forEach((pizza) => {
//     console.log(
//       `Creating a page for ${pizza.name} at pizza/${pizza.slug.current}`
//     );

//     actions.createPage({
//       path: `pizza/${pizza.slug.current}`,
//       component: pizzaPageTemplate,
//       context: {
//         slug: pizza.slug.current,
//       },
//     });
//   });
// }

// async function turnToppingsIntoPages({ graphql, actions }) {
//   console.log('Creating toppings page...');

//   // 1. Get a template for this page
//   const toppingPageTemplate = path.resolve('./src/pages/pizzas.js');

//   // 2. Query all toppings
//   const { data } = await graphql(`
//     query MyQuery {
//       toppings: allSanityTopping {
//         nodes {
//           name
//           id
//         }
//       }
//     }
//   `);

//   // 4. Pass topping data to pizza.js
//   data.toppings.nodes.forEach((topping) => {
//     actions.createPage({
//       path: `topping/${topping.name}`,
//       component: toppingPageTemplate,
//       context: {
//         topping: topping.name,
//         toppingRegex: `/${topping.name}/i`,
//       },
//     });
//   });
// }

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  // 1. Fetch a  list of beers
  console.log('Fetching beers data from https://api.sampleapis.com/beers/ale');
  const resp = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await resp.json();

  // 2. Loop over each one & create a node for each beer
  for (const beer of beers) {
    const nodeContent = JSON.stringify(beer);

    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        content: nodeContent,
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. Create a node for that beer
    const node = { ...beer, ...nodeMeta };
    createNode(node);
  }
};

async function turnStaffMembersIntoPages({ graphql, actions }) {
  // 1. Query all slice masters
  const { data } = await graphql(`
    query MyQuery {
      staffMembers: allSanityPerson {
        totalCount
        nodes {
          _id
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 2. Figure out how many pages there are based on how many sliceMasters there are & how many we want per page
  // fix this
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE) == null ? 4 : 4;
  const pageCount = Math.ceil(data.staffMembers.totalCount / pageSize);

  console.log(
    `Creating ${pageCount} pages for ${data.staffMembers.totalCount} staffMembers at ${pageSize} per page`
  );

  // 3. Loop from 1 to n & create the pages for them
  Array.from({ length: 5 }).forEach((_, i) => {
    actions.createPage({
      path: `staff/${i + 1}`,
      component: path.resolve('./src/pages/staff.js'),
      context: {
        // skip: i * pageSize,
        currentPage: i + 1,
        totalPages: pageCount,
        // pageSize,
      },
    });
  });

  const staffMemberPageTemplate = path.resolve(
    './src/templates/StaffMemberPageTemplate.js'
  );

  // 4. Also create individual sliceMaster pages
  data.staffMembers.nodes.forEach((staffMember) => {
    actions.createPage({
      component: staffMemberPageTemplate,
      path: `/staff/${staffMember.slug.current}`,
      context: {
        name: staffMember.person,
        slug: staffMember.slug.current,
      },
    });
  });
}

export async function createPages(params) {
  // create pages dynamically
  // 1. Pizzas and 2. Toppings and 3. SliceMasters
  await Promise.all([
    // turnPizzasIntoPages(params),
    // turnToppingsIntoPages(params),
    turnStaffMembersIntoPages(params),
    turnStoreItemsIntoPages(params),
    turnItemTagsIntoPages(params),
  ]);
}
