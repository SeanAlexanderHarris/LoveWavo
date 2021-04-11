import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const StoreItemGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function StoreItemPageTemplate({ data: { storeItem } }) {
  return (
    <>
      <SEO title={storeItem.name} image={storeItem.image?.asset?.fluid?.src} />
      <StoreItemGrid>
        <Img fluid={storeItem.image.asset.fluid} />
        <div>
          <h2 className="mark">{storeItem.name}</h2>
          <ul>
            {storeItem.itemTags.map((itemTag) => (
              <li key={itemTag.id}>{itemTag.name}</li>
            ))}
          </ul>
        </div>
      </StoreItemGrid>
    </>
  );
}

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    storeItem: sanityItem(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      itemTags {
        name
        id
        madeLocally
      }
    }
  }
`;
