import { Link } from 'gatsby';
import React from 'react';
import BlogPostPreview from './blog-post-preview';
import styles from './blog-post-preview-grid.module.css';

function BlogPostPreviewGrid({ title, browseMoreHref, nodes }) {
  return (
    <div className={styles.root}>
      {title && (
        <h2 className={styles.headline}>
          {browseMoreHref ? <Link to={browseMoreHref}>{title}</Link> : title}
        </h2>
      )}
      <ul className={styles.grid}>
        {nodes &&
          nodes.map((node) => (
            <li key={node.id}>
              <BlogPostPreview {...node} />
            </li>
          ))}
      </ul>
      {browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
  );
}

BlogPostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
};

export default BlogPostPreviewGrid;
