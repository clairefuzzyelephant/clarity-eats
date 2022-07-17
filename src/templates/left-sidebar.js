import React from "react";
import "../styling/index.css";

import Subscribe from "./Subscribe.js";

export default function LeftSideBar({ site, image }) {
  const { title, description } = site.siteMetadata;

  return (
    <div className="leftSidebar">
        <div className="siteTitle">{title}</div>
        <p>{description}</p>
        <div className="subscribeForm">
          <p>subscribe for email updates!</p>
          <Subscribe />
        </div>
        <img alt="Running totoro" src={image.publicURL}/>
    </div>
  )
}