import React from 'react';
import { navigate } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { checkCanPass } from '../../utils';

const BlogGrid = ({ data, style, showPwdModal }) => {
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

  const beforeNavigate = () => {
    if (!pwd || checkCanPass()) {
      return navigate(slug);
    }

    showPwdModal({ pwd, slug });
  };

  return (
    <div className='blog-grid' style={style}>
      <div className='blog-grid-cover' onClick={beforeNavigate}>
        <GatsbyImage image={childImageSharp.gatsbyImageData} alt='' />
      </div>

      <div className='blog-grid-detail'>
        <div className='blog-grid-title' onClick={beforeNavigate}>
          {title}
        </div>
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
