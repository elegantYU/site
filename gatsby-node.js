require('dotenv').config()
const path = require('path')
const moment = require("moment");
const kebabCase = require("lodash.kebabcase");
const { generateImageData, getLowResolutionImageURL } = require('gatsby-plugin-image')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
const { GitalkPluginHelper } = require('gatsby-plugin-gitalk')
const config = require('./config')


const postNodes = []

const addSiblingNodes = (createNodeField) => {
  postNodes.sort(
    ({ frontmatter: { date: date1 } }, { frontmatter: { date: date2 } }) => {
      const dateA = moment(date1, 'YYYY-MM-DD');
      const dateB = moment(date2, 'YYYY-MM-DD');

      if (dateA.isBefore(dateB)) return 1;
      if (dateB.isBefore(dateA)) return -1;

      return 0;
    }
  );

  for (let i = 0; i < postNodes.length; i += 1) {
    const nextID = i + 1 < postNodes.length ? i + 1 : 0;
    const prevID = i - 1 >= 0 ? i - 1 : postNodes.length - 1;
    const currNode = postNodes[i];
    const nextNode = postNodes[nextID];
    const prevNode = postNodes[prevID];

    createNodeField({
      node: currNode,
      name: "nextTitle",
      value: nextNode.frontmatter.title,
    });

    createNodeField({
      node: currNode,
      name: "nextSlug",
      value: nextNode.fields.slug,
    });

    createNodeField({
      node: currNode,
      name: "prevTitle",
      value: prevNode.frontmatter.title,
    });

    createNodeField({
      node: currNode,
      name: "prevSlug",
      value: prevNode.fields.slug,
    });
  }
}

// 图片引用适配 mdx 所创建的 type
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter  
      cover: File @link(from: "fields.cover")
    }
    type Frontmatter {
      thumbnail: String
    }
  `)
}

exports.onCreateNode = async ({ node, createNodeId, actions: { createNodeField, createNode }, getNode, cache, store }) => {
  let slug

  if (node.internal.type === 'Mdx') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/article/${kebabCase(node.frontmatter.title)}/`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/article/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/article/${parsedFilePath.name}/`;
    } else {
      slug = `/article/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/article/${node.frontmatter.slug}/`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = new Date(node.frontmatter.date);

        createNodeField({
          node,
          name: "date",
          value: date.toISOString(),
        });
      }
    }

    // 转换图片类型
    if (node.frontmatter && node.frontmatter.thumbnail) {
       const fileNode = await createRemoteFileNode({
        url: node.frontmatter.thumbnail,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        store
      });

      if (fileNode) {
        createNodeField({ node, name: 'cover', value: fileNode.id })
      }
    }

    createNodeField({ node, name: "slug", value: slug });
    postNodes.push(node);
  }
}

exports.setFieldsOnGraphQLNodeType = ({ type, actions }) => {
  const { name } = type;
  const { createNodeField } = actions;
  if (name === "Mdx") {
    addSiblingNodes(createNodeField);
  }
};

exports.createPages = async ({ graphql, actions, getNode, reporter }) => {
  const { createPage } = actions
  const site = getNode('Site')
  const {siteMetadata: {siteUrl}} = site
  const blogPage = path.resolve('src/templates/blog.js')
  const gitalkCreateIssueToken = process.env.GITALK_CREATE_ISSUE_TOKEN

  return new Promise((resolve, reject) => {
    const fetchBlog = () => graphql(`
      {
        allMdx {
          nodes {
            id
            frontmatter {
              slug
              tags
              title
              excerpt
              template
              categories
            }
          }
        }
      }
    `).then(res => {
      const {data, errors} = res
  
      if (errors) {
        console.log('创建页面错误', errors, res)
        return reject(errors)
      }

      data.allMdx.nodes.forEach(async (node) => {
        const { template, excerpt, slug } = node.frontmatter

        if (template === 'post') {
          createPage({
            path: `article/${slug}`,
            component: blogPage,
            context: {
              slug: slug
            }
          })

          // create issue
          if (gitalkCreateIssueToken) {
            const issueOptions = Object.assign({}, config.gitalk, {
              id: slug,
              title: slug,
              description: excerpt,
              url: `${siteUrl}/article/${slug}`,
            }, {
              personalToken: gitalkCreateIssueToken
            })
            reporter.info(`create issue: ${slug}`)
            await GitalkPluginHelper.createIssue(issueOptions)
          }
        }
      })

    })

    resolve(fetchBlog())
  })
}