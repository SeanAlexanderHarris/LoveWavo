import { Link } from 'gatsby';
import React from 'react';
import { buildImageObj, cn, getBlogUrl } from '../../blogHelpers/helpers';
import { imageUrlFor } from '../../blogHelpers/image-url';
import BlockText from './block-text';

import styles from './blog-post-preview.module.css';
import { responsiveTitle3 } from './typography.module.css';

function BlogPostPreview({ publishedAt, slug, mainImage, _rawExcerpt, title }) {
  return (
    <Link className={styles.root} to={getBlogUrl(publishedAt, slug.current)}>
      <div className={styles.leadMediaThumb}>
        {mainImage && mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .url()}
            alt={mainImage.alt}
          />
        )}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{title}</h3>
      {_rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={_rawExcerpt} />
        </div>
      )}
    </Link>
  );
}

export default BlogPostPreview;
