import React, { useState, useEffect } from 'react';
import { graphql, useScrollRestoration } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { GatsbyImage } from 'gatsby-plugin-image';

import Seo from '../components/SEO';
import Sidebar from '../components/blog/sidebar';

const Blog = ({ data, location }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const blogRestoration = useScrollRestoration('blog');
  const {
    mdx: {
      body,
      frontmatter: { title, categories, excerpt, date, slug, thumbnail, pwd },
    },
  } = data;
  const gitalkConfig = {
    id: slug,
    title,
  };
  const elasticClass = `blog-elastic-container ${sidebarOpen ? 'sidebar-open' : ''}`;

  const switchSidebarStatus = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const checkPwdState = () => {
    // 列表页进入或有永久令牌
    if (pwd && location.state.hasPass) {
    }
  };

  useEffect(() => {
    checkPwdState();
  }, []);

  return (
    <>
      <Seo title={title} description={excerpt} />
      <div className={elasticClass} {...blogRestoration}>
        <button className='temp-btn' onClick={switchSidebarStatus}>
          开关
        </button>
        <div className='blog-wrapper'>
          <div className='blog-header'>
            <div className='blog-header-detail'>
              <p className='blog-header-detail-category'>{categories[0]}</p>
              <p className='blog-header-detail-point'></p>
              <p className='blog-header-detail-date'>{date}</p>
            </div>
            <section className='blog-title'>{title}</section>
            {/* <section className='blog-desc'>{excerpt}</section> */}
          </div>
          <div className='blog-banner'>
            <GatsbyImage image={thumbnail.childImageSharp.gatsbyImageData} alt={title} />
          </div>
          <div className='markdown-body'>
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </div>
        <Sidebar data={gitalkConfig} active={sidebarOpen} />
      </div>
    </>
  );
};

export const pageQuery = graphql`
  query BlogQuery($slug: String) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        slug
        title
        excerpt
        categories
        date(formatString: "MMMM DD, YYYY")
        thumbnail {
          childImageSharp {
            gatsbyImageData(jpgOptions: { progressive: true, quality: 90 })
          }
        }
      }
    }
  }
`;

export default Blog;
