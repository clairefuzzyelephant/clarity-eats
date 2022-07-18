import React from "react";
import "../styling/index.css";
import { Link } from "gatsby";

import Subscribe from "./Subscribe.js";

export default function LeftSideBar({ site, image }) {
  const { title, description } = site.siteMetadata;

  return (
    <div className="leftSidebar">
        <div className="siteTitle">{title}</div>
        <p>{description}</p>
        <div className="leftSidebarMenu">
          <Link className="leftSidebarLink" to="/">home</Link>
          <Link className="leftSidebarLink" to="/about/">about</Link>
        </div>
        <div className="subscribeForm">
          <p>subscribe for email updates!</p>
          <Subscribe />
        </div>
        <img alt="Running totoro" src={image.publicURL}/>
    </div>
  )
}