import React from "react"
import { graphql, Link } from "gatsby"
import "../styling/index.css";

import Blog from "./blog";

export default function Home({ data }) {
  const { title, description } = data.site.siteMetadata;

  return (
    <div className="siteContainer">
      <div className="leftSidebar">
        <div className="siteTitle">{title}</div>
        <p>{description}</p>
        <input type="text" placeholder="search..." />
        <img alt="Running totoro" src={data.image.publicURL}/>
      </div>
      <div className="postContainer">
        <Blog data={data} />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query MetadataQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    image: file(base: {eq: "runningTotoro.gif" }) {
      publicURL
    }
    blog: allMarkdownRemark {
      posts: nodes {
        fields {
          slug
        }
        frontmatter {
          date(fromNow: true)
          title
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        excerpt
        id
      }
    }
  }
`
