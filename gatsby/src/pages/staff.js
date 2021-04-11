import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const StaffGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const StaffMemberStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function StaffPage({ data, pageContext }) {
  return (
    <>
      <SEO title={`Slicemasteres - Page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.staff.totalCount}
        currentPage={pageContext.cuurentPage || 1}
        skip={pageContext.skip}
        base="/staff"
      />
      <StaffGrid>
        {data.staff.nodes.map((person) => (
          <StaffMemberStyles key={`${person.id}`}>
            <Link to={`/staff/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </StaffMemberStyles>
        ))}
      </StaffGrid>
    </>
  );
}

export const query = graphql`
  #   query StaffMemberQuery($skip: Int = 0, $pageSize: Int = 4) {
  query StaffMemberQuery {
    # staff: allSanityPerson(skip: $skip, limit: $pageSize) {
    staff: allSanityPerson(skip: 0, limit: 4) {
      totalCount
      nodes {
        id
        name
        description
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
