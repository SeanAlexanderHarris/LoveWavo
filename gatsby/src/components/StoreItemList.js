import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const StoreItemGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const StoreItemStyles = styled.div`
  display: grid;
  /* take your sizing from the PizzaGridStyles grid, not the pizzastyles div */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SingleStoreItem({ storeItem }) {
  return (
    <StoreItemStyles>
      <Link to={`/store/${storeItem.slug.current}`}>
        <h2>
          <span className="mark">{storeItem.name}</span>
        </h2>
      </Link>
      {/* <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p> */}
      <Img fluid={storeItem.image.asset.fluid} alt={storeItem.name} />
    </StoreItemStyles>
  );
}

export default function StoreItemList({ storeItems }) {
  return (
    <StoreItemGridStyles>
      {storeItems.map((storeItem) => (
        <SingleStoreItem key={storeItem._id} storeItem={storeItem} />
      ))}
    </StoreItemGridStyles>
  );
}
