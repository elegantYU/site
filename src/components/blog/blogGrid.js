import React, { forwardRef } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const BlogGrid = forwardRef(({ data }, ref) => {
  const {
    frontmatter: { title, date, categories, excerpt },
    fields: { slug },
    cover: { childImageSharp },
  } = data;

  return (
    <div className='blog-grid' ref={ref}>
      <Link className='blog-grid-cover' to={slug}>
        <GatsbyImage image={childImageSharp.gatsbyImageData} alt='' />
      </Link>

      <div className='blog-grid-desc'>
        <span className='blog-grid-tag'>{categories[0]}</span>
        <span className='blog-grid-point'></span>
        <span className='blog-grid-date'>{date}</span>
      </div>
      <Link className='blog-grid-title' to={slug}>
        {title}
      </Link>
      <div className='blog-grid-excerpt'>{excerpt}</div>
    </div>
  );
});

export default BlogGrid;
