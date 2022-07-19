import React from "react"
import { Link, graphql } from "gatsby"

import "../styling/index.css";

export default function Blog({ data, context }) {
    const posts = data;
    let postArray = []
    for (let i = 0; i < posts.length; i++) {
        postArray.push([posts[i].fields.slug, posts[i].frontmatter.featuredImage.childImageSharp.fluid.src, posts[i].frontmatter.title, posts[i].frontmatter.date, posts[i].excerpt])
    }
    let pageNumArray = []
    for (let i = 0; i < context.numPages; i++) {
        pageNumArray.push(i+1);
    }
    return (
        <div>
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
            <div className="pageNumMenu">
                {pageNumArray.map(pageNum => (
                            <Link className="pageNum" to={pageNum == 1 ? "/" : "page" + (pageNum).toString()}>
                                {pageNum == context.currentPage ? 
                                <div className="currentPageLink">
                                    {pageNum}
                                </div>
                                : <div className="otherPageLink">
                                    {pageNum}
                                </div>}
                            </Link>
                    ))}
            </div>
        </div>
    )

}