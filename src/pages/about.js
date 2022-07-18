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
                        hello and welcome to my travel and food blog! i love trying foods in new places, so i decided to make a blog out of it. this is still very much a work in progress, but hopefully you'll find something of interest here :) ☆ 
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}