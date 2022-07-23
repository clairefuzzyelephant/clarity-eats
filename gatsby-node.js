const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` });

        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
      query {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                date
              }
            }
          }
        }
      }
    `);
    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 10
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/page${i + 1}`,
        component: path.resolve(`./src/templates/index.js`),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    const monthNames = ["january","february","march","april","may","june","july","august","september","october","november","december"];

    const postsByMonth = [0];
    const monthLabels = []
    let currentMonth = null;
    for (let i = 0; i < posts.length; i++) {
      const dateObj = new Date(posts[i].node.frontmatter.date);
      const dateMonth = monthNames[dateObj.getMonth()] + dateObj.getFullYear().toString();
      if (!currentMonth) {
        currentMonth = dateMonth;
        monthLabels.push(currentMonth);
      }
      if (dateMonth == currentMonth) {
        postsByMonth[postsByMonth.length - 1] += 1;
      } else {
        postsByMonth.push(1);
        currentMonth = dateMonth;
        monthLabels.push(currentMonth);
      }
    }

    let accumulated = 0;
    postsByMonth.forEach((postGroup, i) => {
      createPage({
        path: `/${monthLabels[i]}`,
        component: path.resolve(`./src/templates/index.js`),
        context: {
          limit: postGroup,
          skip: accumulated,
        }
      })
      accumulated += postGroup;
    })
  
    result.data.allMarkdownRemark.edges.forEach(({ node }, index) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/single-post.js`),
        context: {
          slug: node.fields.slug,
          next: index === 0 ? null : posts[index-1].node,
          prev: index === (posts.length - 1) ? null : posts[index + 1].node
        },
      })
    })
  }