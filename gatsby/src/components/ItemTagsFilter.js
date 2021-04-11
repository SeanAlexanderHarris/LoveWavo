import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ItemTagsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-gap: 0 1rem;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countStoreItemsWithTags(storeItems) {
  // Return the items with counts
  const counts = storeItems
    .map((storeItem) => storeItem.itemTags)
    .flat()
    .reduce((acc, itemTag) => {
      // check if this is an existing item tag
      const existingItemTag = acc[itemTag.id];
      if (existingItemTag) {
        //  if it is, increment by 1
        existingItemTag.count += 1;
      } else {
        // otherwise create a new entry in our acc and set it to one
        acc[itemTag.id] = {
          id: itemTag.id,
          name: itemTag.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeItemTag }) {
  const { itemTags, storeItems } = useStaticQuery(graphql`
    query {
      itemTags: allSanityItemTag {
        nodes {
          name
          id
          madeLocally
        }
      }
      storeItems: allSanityItem {
        nodes {
          itemTags {
            name
            id
          }
        }
      }
    }
  `);

  const itemTagsByStoreItemCounts = countStoreItemsWithTags(storeItems.nodes);

  return (
    <ItemTagsStyles>
      {itemTagsByStoreItemCounts.map((itemTagCount) => (
        <Link
          to={`/itemtags/${itemTagCount.name.replace(/\s/g, '')}`}
          key={itemTagCount.id}
        >
          <span className="name">{itemTagCount.name}</span>
          <span className="count">{itemTagCount.count}</span>
        </Link>
      ))}
    </ItemTagsStyles>
  );
}
