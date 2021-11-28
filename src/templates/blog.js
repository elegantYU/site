import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../layout';
import Seo from '../components/SEO';

const Blog = ({ data }) => {
  console.log('blogblogblog', data);
  const {
    mdx: {
      body,
      cover,
      frontmatter: { title, categories, excerpt, date },
    },
  } = data;
  console.log('thumbnail', cover)

  return (
    <Layout>
      <Seo title={title} description={excerpt} />
      <div className="blog-wrapper">
        <div className="blog-header">
          <div className="blog-header-detail">
            <p className="blog-header-detail-category">{categories[0]}</p>
            <p className="blog-header-detail-point"></p>
            <p className="blog-header-detail-date">{ date }</p>
          </div>
          <section className="blog-title">{title}</section>
          <section className="blog-desc">{excerpt}</section>
        </div>
        <div className="blog-banner">
          <GatsbyImage image={cover.childImageSharp.gatsbyImageData} alt={title} />
        </div>
        <div className='markdown-body'>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
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
        title
        excerpt
        categories
        date(formatString: "MMMM DD, YYYY")
      }
      cover {
        childImageSharp {
          gatsbyImageData(jpgOptions: {progressive: true, quality: 90})
        }
      }
    }
  }
`;

export default Blog;
