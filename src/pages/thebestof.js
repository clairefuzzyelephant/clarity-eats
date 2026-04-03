import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import LeftSideBar from "../templates/left-sidebar"
import Footer from "../templates/Footer"

import "../styling/index.css"

export default function TheBestOf() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
      image: file(base: { eq: "totoro-gif2music.gif" }) {
        publicURL
      }
    }
  `)
  return (
    <div className="siteContainer">
      <div className="siteMainContent">
        <LeftSideBar site={data.site} image={data.image} />
        <div className="postContainer">
          <div className="aboutContainer">
            the best of nyc according to me. updated periodically.
            <br />
            <br />
            <h3>nyc</h3>
            1. <a href="/antidote">antidote</a>
            <br />
            2. chongqing lao zao
            <br />
            3. <a href="/udonstmarks">udon st. marks</a>{" "}
            <i>
              Note: This place became TikTok-famous recently so beware of a
              wait!
            </i>
            <br />
            4. <a href="/chodanggol">cho dang gol</a>
            <br />
            5. traveler
            <br />
            <br />
            <i>last updated April 3, 2026</i>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
