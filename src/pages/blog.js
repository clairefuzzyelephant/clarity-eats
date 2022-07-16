import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Menu from "../templates/Menu.js";

import "../styling/index.css";

export default function Blog() {
    const data = useStaticQuery(graphql `
        query {
            blog: allMarkdownRemark {
                posts: nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "LL")
                        title
                        featuredImage{
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
    `)
    const { posts } = data.blog;
    let postArray = []
    for (let i = 0; i < posts.length; i++) {
        postArray.push([posts[i].fields.slug, posts[i].frontmatter.featuredImage.childImageSharp.fluid.src, posts[i].frontmatter.title, posts[i].frontmatter.date, posts[i].excerpt])
    }
    postArray.sort(function(a, b) {
        return new Date(b[3]) - new Date(a[3]);
    })
    return (
        <div>
            {postArray.map(([slug, src, title, date, excerpt]) => (
                <div className="postBox">
                    <Link className="post" to={slug}>
                        <img alt="" src={src} />
                        <div className="postTitle">{title}</div>
                        <small>{date}</small>
                        <p>{excerpt}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}