import React from "react";
import "../styling/index.css";
import "../styling/left-sidebar.css";
import { Link } from "gatsby";

import Subscribe from "./Subscribe.js";

export default function LeftSideBar({ site, image }) {
  const { title, description } = site.siteMetadata;

  const dateNow = new Date();
  let startDate = new Date("2022-06-02");

  const monthNames = ["january","february","march","april","may","june","july","august","september","october","november","december"];

  const months = [];
  while (startDate < dateNow) {
    months.push(monthNames[startDate.getMonth()] + startDate.getFullYear().toString());
    startDate.setMonth(startDate.getMonth() + 1);
  }


  return (
    <div className="leftSidebar">
        <div className="titleSection">
          <img alt="Ocarina totoro" src={image.publicURL}/>
          <div className="titleDescription">
            <div className="siteTitle">{title}</div>
            <p>{description}</p>
          </div>
        </div>
        
        <div className="leftSidebarMenu">
          <Link className="leftSidebarLink" to="/">home</Link>
          <Link className="leftSidebarLink" to="/about/">about</Link>
        </div>
        <div className="subscribeForm">
          <p>subscribe for email updates!</p>
          <Subscribe />
        </div>
        <div className="archiveSection">
          <div>archive</div>
          <div>
            {months.reverse().map(month => 
            <div>
              <Link className="archiveSectionLink" to={"/" + month}>{month.slice(0, month.length-4) + " " + month.slice(month.length-4)}</Link>
            </div>
            )}
          </div>
        </div>
    </div>
  )
}