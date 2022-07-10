import React from "react";
import "../styling/index.css";

export default function LeftSideBar({ data }) {
  const { title, description } = data.site.siteMetadata;

  return (
    <div className="leftSidebar">
        <div className="siteTitle">{title}</div>
        <p>{description}</p>
        <input type="text" placeholder="search..." />
        <img alt="Running totoro" src={data.image.publicURL}/>
    </div>
  )
}