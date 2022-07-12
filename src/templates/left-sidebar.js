import React from "react";
import "../styling/index.css";

import SearchBar from "./SearchBar.js";

export default function LeftSideBar({ site, image, searchFunction, clearSearch }) {
  const { title, description } = site.siteMetadata;

  return (
    <div className="leftSidebar">
        <div className="siteTitle">{title}</div>
        <p>{description}</p>
        <SearchBar searchFunction={searchFunction} clearSearch={clearSearch} />
        <img alt="Running totoro" src={image.publicURL}/>
    </div>
  )
}