import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const BlogGrid = ({ data, style }) => {
  const {
    frontmatter: {
      title,
      pwd,
      date,
      categories,
      excerpt,
      thumbnail: { childImageSharp },
    },
    fields: { slug },
  } = data;

  return (
    <div className='blog-grid' style={style}>
      <Link className='blog-grid-cover' to={slug}>
        <GatsbyImage image={childImageSharp.gatsbyImageData} alt='' />
      </Link>

      <div className='blog-grid-detail'>
        <Link className='blog-grid-title' to={slug}>
          {title}
        </Link>
        <div className='blog-grid-desc'>
          <span className='blog-grid-tag'>{categories[0]}</span>
          <span className='blog-grid-point'></span>
          <span className='blog-grid-date'>{date}</span>
        </div>
        {/* <div className='blog-grid-excerpt'>{excerpt}</div> */}
      </div>
    </div>
  );
};

export default BlogGrid;
