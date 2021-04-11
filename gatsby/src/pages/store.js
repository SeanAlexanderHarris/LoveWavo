import { graphql } from 'gatsby';
import React from 'react';
import StoreItemList from '../components/StoreItemList';
import SEO from '../components/SEO';
import ItemTagsFilter from '../components/ItemTagsFilter';

export default function StorePage({ data, pageContext }) {
  const storeItems = data.storeItems.nodes;
  return (
    <>
      <SEO
        title={
          pageContext.itemTag
            ? `Items tagged ${pageContext.itemTag}`
            : `All Items`
        }
      />
      <ItemTagsFilter />
      <StoreItemList storeItems={storeItems} />
    </>
  );
}

export const query = graphql`
  query StoreQuery {
    storeItems: allSanityItem {
      nodes {
        name
        price
        slug {
          current
        }
        itemTags {
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        _id
      }
    }
  }
`;
