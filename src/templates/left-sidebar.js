import React, { useState } from "react"
import "../styling/index.css"
import "../styling/left-sidebar.css"
import { Link } from "gatsby"

import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai"

import Subscribe from "./Subscribe.js"

export default function LeftSideBar({ site, image, postsByMonth }) {
  const { title, description } = site.siteMetadata

  const showExpansion = postsByMonth
    ? Object.keys(postsByMonth).reduce((show, month) => {
        show[month] = false
        return show
      }, {})
    : null

  const [expandArchive, setExpandArchive] = useState(showExpansion)

  return (
    <div className="leftSidebar">
      <div className="titleSection">
        <Link to="/">
          <img alt="clarity eats logo" src={image.publicURL} />
        </Link>
        <div className="titleDescription">
          <Link to="/" className="linkNoFormatting">
            <div className="siteTitle">{title}</div>
          </Link>
          <p>{description}</p>
        </div>
      </div>
      <div className="leftSidebarMenu">
        <div>
          <Link className="leftSidebarLink" to="/">
            home
          </Link>
        </div>
        <div>
          <Link className="leftSidebarLink" to="/about/">
            about
          </Link>
        </div>
        <div>
          <Link className="leftSidebarLink" to="/thebestof/">
            faves
          </Link>
        </div>
        <div className="leftSidebarIconDiv">
          <a
            className="leftSidebarIcon"
            target="_blank"
            href="https://www.instagram.com/clarityeats/"
          >
            <AiOutlineInstagram />
          </a>
        </div>
        <div className="leftSidebarIconDiv">
          <a
            className="leftSidebarIcon"
            target="_blank"
            href="https://www.youtube.com/@clarityeats"
          >
            <AiOutlineYoutube />
          </a>
        </div>
      </div>
      <div className="subscribeForm">
        <p>subscribe for email updates!</p>
        <Subscribe />
      </div>{" "}
      {postsByMonth ? (
        <div className="archiveSection">
          <div>archive</div>
          <div>
            {Object.entries(postsByMonth).map(([month, monthPosts]) => (
              <div
                onMouseOver={() => {
                  setExpandArchive(prevState => {
                    prevState[month] = true
                    return {
                      ...prevState,
                    }
                  })
                }}
                onMouseLeave={() =>
                  setExpandArchive(prevState => {
                    prevState[month] = false
                    return {
                      ...prevState,
                    }
                  })
                }
                className="archiveSectionMonthSection"
              >
                <Link className="archiveSectionLink" to={"/" + month}>
                  {month.slice(0, month.length - 4) +
                    " " +
                    month.slice(month.length - 4)}
                </Link>
                {expandArchive && expandArchive[month] && monthPosts
                  ? monthPosts.map(post => (
                      <div className="archiveSectionSubLinkSection">
                        <Link
                          className="archiveSectionSubLink"
                          to={post.fields.slug}
                        >
                          {post.frontmatter.title}
                        </Link>
                      </div>
                    ))
                  : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
