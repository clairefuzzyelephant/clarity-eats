import React from "react"
import { graphql, Link } from "gatsby"
import "../styling/single-post.css"
import { Disqus } from "gatsby-plugin-disqus"
import Footer from "./Footer"
import ocarinaTotoro from "../images/totoro-gif2music.gif"
import { navigate } from "gatsby"

export default function BlogPost({ data, pageContext }) {
  const { prev, next } = pageContext
  const post = data.markdownRemark

  let disqusConfig = {
    url: "https://clarity-eats.netlify.app" + post.fields.slug,
    title: post.frontmatter.title,
    identifier: post.id,
  }

  return (
    <div className="singlePostViewSiteContainer">
      <img
        className="singlePostViewSideImage"
        alt="Ocarina totoro"
        src={ocarinaTotoro}
      />
      <div className="singlePostContainer">
        <div onClick={() => navigate("/")} className="singlePostBackButton">
          ← home
        </div>
        <h1>{post.frontmatter.title}</h1>
        <small>{post.frontmatter.date}</small>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="singlePostEndNavigation">
          {next ? (
            <Link to={next.fields.slug} className="singlePostBackButton">
              ← newer post
            </Link>
          ) : (
            <div />
          )}
          <Link to="/" className="singlePostBackButton">
            home
          </Link>
          {prev ? (
            <Link to={prev.fields.slug} className="singlePostBackButton">
              older post →
            </Link>
          ) : (
            <div style={{ width: "100px" }} />
          )}
        </div>
      </div>
      <div className="commentSection">
        <h1>share your thoughts!</h1>
        <Disqus config={disqusConfig} />
      </div>
      <Footer />
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
      fields {
        slug
      }
    }
  }
`
