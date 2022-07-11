import React from "react";
import "../styling/index.css";

import SearchBar from "./searchbar";

export default function LeftSideBar({ site, image, searchFunction }) {
  const { title, description } = site.siteMetadata;

  return (
    <div className="leftSidebar">
        <div className="siteTitle">{title}</div>
        <p>{description}</p>
        <SearchBar searchFunction={searchFunction} />
        <img alt="Running totoro" src={image.publicURL}/>
    </div>
  )
}