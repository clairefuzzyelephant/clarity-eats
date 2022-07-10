import React from "react"
import { graphql, Link } from "gatsby"
import "../styling/index.css";

export default function Home({ data }) {
  const { title, description } = data.site.siteMetadata;

  return (
    <div className="siteContainer">
      <div className="leftSidebar">
        <img alt="Soytalk" src={data.image.publicURL}/>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div>
        <Link to="/blog">Read my blog</Link>
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
    image: file(base: {eq: "soytalk.jpg" }) {
      publicURL
    }
  }
`
