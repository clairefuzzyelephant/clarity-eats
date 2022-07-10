import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import "../styling/index.css";

export default function Blog({ data }) {
    const { posts } = data.blog;

    return (
        <div>
            {posts.map(post => (
                <Link className="post" to={post.fields.slug}>
                    <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
                    <div className="postTitle">{post.frontmatter.title}</div>
                    <small>{post.frontmatter.date}</small>
                    <p>{post.excerpt}</p>
                </Link>
            ))}
        </div>
    )
}