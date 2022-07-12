import React from "react";
import { graphql, Link } from "gatsby";
import "../styling/single-post.css";

export default function BlogPost({ data }) {
  const post = data.markdownRemark

  return (
    <div className="siteContainer">
      <div className="singlePostContainer">
        <Link to="/" className="singlePostBackButton">
         ← back
        </Link>
        <h1>{post.frontmatter.title}</h1>
        <small>{post.frontmatter.date}</small>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </div>
  )
}
export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "LL")
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
