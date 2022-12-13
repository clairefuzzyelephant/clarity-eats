import React, { useState } from "react";
import "../styling/index.css";
import "../styling/left-sidebar.css";
import { Link } from "gatsby";

import { AiOutlineInstagram, AiOutlineYoutube } from 'react-icons/ai'

import Subscribe from "./Subscribe.js";

export default function LeftSideBar({ site, image, titles, links }) {
  const { title, description } = site.siteMetadata;
  const currentDate = new Date(); //hardcoded
  let startDate = new Date("2022-06-02"); //hardcoded, my first blog post

  const monthNames = ["january","february","march","april","may","june","july","august","september","october","november","december"];

  const months = [];
  let i = 0;
  while (startDate < currentDate) {
    if (titles && i >= titles.length) break;
    months.push(monthNames[startDate.getMonth()] + startDate.getFullYear().toString());
    startDate.setMonth(startDate.getMonth() + 1);
    i += 1;
  }
  const showExpansion = titles ? Object.fromEntries( titles.map( (_, i) => [months[i], false])) : null;

  const [expandArchive, setExpandArchive] = useState (showExpansion);

  return (
    <div className="leftSidebar">
        <div className="titleSection">
          <Link to="/"><img alt="clarity eats logo" src={image.publicURL}/></Link>
          <div className="titleDescription">
            <Link to="/" className="linkNoFormatting">
              <div className="siteTitle">{title}</div>
            </Link>
            <p>{description}</p>
          </div>
        </div>
        <div className="leftSidebarMenu">
          <div><Link className="leftSidebarLink" to="/">home</Link></div>
          <div><Link className="leftSidebarLink" to="/about/">about</Link></div>
          <div className="leftSidebarIconDiv"><a className="leftSidebarIcon" target="_blank" href="https://www.instagram.com/clarityeats/"><AiOutlineInstagram /></a></div>
          <div className="leftSidebarIconDiv"><a className="leftSidebarIcon"target="_blank" href="https://www.youtube.com/@clarityeats"><AiOutlineYoutube /></a></div>
        </div>
        <div className="subscribeForm">
          <p>subscribe for email updates!</p>
          <Subscribe />
        </div>
        <div className="archiveSection">
          <div>archive</div>
          <div>
            {months.reverse().map((month, i) => 
            <div 
              onMouseOver={() => setExpandArchive((prevState) => {
                  prevState[month] = true;
                  return({
                    ...prevState
                  })
                }
              )}
              onMouseLeave={() => setExpandArchive((prevState) => {
                prevState[month] = false;
                return({
                  ...prevState
                  })
                }
              )}
              className="archiveSectionMonthSection">
              <Link className="archiveSectionLink" to={"/" + month}>{month.slice(0, month.length-4) + " " + month.slice(month.length-4)}</Link>
              {expandArchive && expandArchive[month] ? 
              titles[i].map((title, j) => 
                <div className="archiveSectionSubLinkSection">
                  <Link className="archiveSectionSubLink" to={links[i][j]}>{title}</Link>
                </div>
              ) : null}
            </div>
            )}
          </div>
        </div>
    </div>
  )
}