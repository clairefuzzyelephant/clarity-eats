const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })

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
              title
              date
            }
          }
        }
      }
    }
  `)
  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)

  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]

  function monthLabel(dateObj) {
    return monthNames[dateObj.getMonth()] + dateObj.getFullYear().toString()
  }

  // Group posts by month
  const postsByMonth = {}
  posts.forEach(({ node }) => {
    const postDate = new Date(node.frontmatter.date)
    const label = monthLabel(postDate)

    if (!postsByMonth[label]) {
      postsByMonth[label] = []
    }
    postsByMonth[label].push(node)
  })

  //all posts, broken up by 10 posts per page for ease of access
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page${i + 1}`,
      component: path.resolve(`./src/templates/index.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        posts,
        postsByMonth: postsByMonth,
      },
    })
  })

  // archive of posts, sorted by month
  accumulated = 0
  Object.entries(postsByMonth).forEach(([monthLabel, postsInMonth]) => {
    createPage({
      path: `/${monthLabel}`,
      component: path.resolve(`./src/templates/index.js`),
      context: {
        posts: posts,
        month: monthLabel,
        skip: accumulated,
        limit: postsInMonth.length,
        postsByMonth: postsByMonth,
      },
    })
    accumulated += postsInMonth.length
  })

  result.data.allMarkdownRemark.edges.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/single-post.js`),
      context: {
        slug: node.fields.slug,
        next: index === 0 ? null : posts[index - 1].node,
        prev: index === posts.length - 1 ? null : posts[index + 1].node,
      },
    })
  })
}
