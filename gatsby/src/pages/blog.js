import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/blog/layout';
import { mapEdgesToNodes } from '../blogHelpers/helpers';
import BlogPostPreviewGrid from '../components/blog/blog-post-preview-grid';
import Container from '../components/blog/container';
import GraphQLErrorList from '../components/blog/graphql-error-list';
// import SEO from '../components/seo'
import { responsiveTitle1 } from '../components/blog/typography.module.css';

export const query = graphql`
  query BlogPageQuery {
    posts: allSanityPost(
      limit: 12
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const BlogPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);

  return (
    <Layout>
      {/* <SEO title='Blog' /> */}
      <Container>
        <h1 className={responsiveTitle1}>Blog</h1>
        {postNodes && postNodes.length > 0 && (
          <BlogPostPreviewGrid nodes={postNodes} />
        )}
      </Container>
    </Layout>
  );
};

export default BlogPage;
