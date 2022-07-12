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
      <form
        name="comment-form"
        method="post"
        data-netlify="true"
      >
          <input type="hidden" name="form-name" value="comment-form" />
          <input type="hidden" name="id" value={data.markdownRemark.id} />
          {/* // Add name input
          // Add comment input
          // I also added a checkbox for gdpr consent
          // Can be omitted, but you may need to adapt other things later
          // Workaround:  just add a hidden input that is always true ;) */}
      </form>
    </div>
  )
}
export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
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
