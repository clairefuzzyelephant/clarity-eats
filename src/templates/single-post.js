import React from "react";
import { graphql, Link } from "gatsby";
import "../styling/single-post.css";

export default function BlogPost({ data }) {
  const post = data.markdownRemark

  return (
    <div className="singlePostViewSiteContainer">
      <div className="singlePostContainer">
        <Link to="/" className="singlePostBackButton">
         ← back
        </Link>
        <h1>{post.frontmatter.title}</h1>
        <small>{post.frontmatter.date}</small>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <div className="commentSection">
        <h1>comments</h1>
        <form
          name="comment-form"
          method="post"
          data-netlify="true"
        >
            <input type="hidden" name="form-name" value="comment-form" />
            <input type="hidden" name="id" value={data.markdownRemark.id} />
            <div className="commentSectionName">
              <input type="text" name="name" placeholder="name" />
            </div>
            <div className="commentSectionName">
              <input type="text" name="email" placeholder="email address" />
            </div>
            <div className="commentSectionComment">
              <textarea type="text" name="comment" placeholder="comments"/>
            </div>
            <div className="commentSectionSendButton">
              <button type="submit">Send</button>
            </div>
            {/* // Add name input
            // Add comment input
            // I also added a checkbox for gdpr consent
            // Can be omitted, but you may need to adapt other things later
            // Workaround:  just add a hidden input that is always true ;) */}
        </form>
      </div>
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
