import React, { useState } from 'react';
import { graphql, useScrollRestoration } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { GatsbyImage } from 'gatsby-plugin-image';

import Layout from '../layouts';
import Seo from '../components/SEO';
import Sidebar from '../components/blog/sidebar';

const Blog = ({ data }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const blogRestoration = useScrollRestoration('blog');
  const {
    mdx: {
      body,
      frontmatter: { title, categories, excerpt, date, slug, thumbnail },
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

  return (
    <Layout>
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
    </Layout>
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
