import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

export default function StaffMemberPageTemplate({ data: { staffMember } }) {
  return (
    <>
      <SEO title={staffMember.name} image={staffMember.image.asset.src} />
      <div className="center">
        <Img fluid={staffMember.image.asset.fluid} />
        <div>
          <h2 className="mark">{staffMember.name}</h2>
        </div>
        <p className="description">{staffMember.description}</p>
      </div>
    </>
  );
}

export const query = graphql`
  query StaffMemberPageTemplateQuery($slug: String!) {
    staffMember: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
