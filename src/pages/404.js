import React from "react"
import { useStaticQuery, graphql } from "gatsby";
import LeftSideBar from "../templates/left-sidebar";
import Footer from "../templates/Footer";

import "../styling/index.css";

export default function About() {
    const data = useStaticQuery(graphql `
        query {
            site {
                siteMetadata {
                  title
                  description
                }
            }
            image: file(base: {eq: "runningTotoro.gif" }) {
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
                        that page doesn't exist :( pls try again! ☆ 
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}