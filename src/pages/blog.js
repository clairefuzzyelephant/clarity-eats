import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import "../styling/index.css";

export default function Blog({ blog }) {
    const { posts } = blog;

    return (
        <div>
            {posts.slice(0).reverse().map(post => (
                <div className="postBox">
                    <Link className="post" to={post.fields.slug}>
                        <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
                        <div className="postTitle">{post.frontmatter.title}</div>
                        <small>{post.frontmatter.date}</small>
                        <p>{post.excerpt}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}