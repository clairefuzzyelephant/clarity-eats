import React from "react";
import { graphql, Link } from "gatsby";
import "../styling/single-post.css";
import { Disqus } from 'gatsby-plugin-disqus';
import Footer from "./Footer";

export default function BlogPost({ data, pageContext }) {
  const {prev, next} = pageContext
  console.log(prev)
  console.log(next)
  const post = data.markdownRemark

  let disqusConfig = {
    url: 'https://clarity-eats.netlify.app' + post.fields.slug, 
    title: post.frontmatter.title,
    identifier: post.id
  };

  return (
    <div className="singlePostViewSiteContainer">
      <div className="singlePostContainer">
        <Link to="/" className="singlePostBackButton">
         ← back
        </Link>
        <h1>{post.frontmatter.title}</h1>
        <small>{post.frontmatter.date}</small>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="singlePostEndNavigation">
          {prev ? 
          <Link to={prev.fields.slug} className="singlePostBackButton">
          ← previous post
          </Link> : null}
          {next ? 
          <Link to={next.fields.slug} className="singlePostBackButton">
          next post → 
          </Link> : null}
        </div>
      </div>
      <div className="commentSection">
        <h1>share your thoughts!</h1>
        <Disqus
          config={disqusConfig}
       />
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
