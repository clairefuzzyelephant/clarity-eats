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
            image: file(base: {eq: "totoro-gif2music.gif" }) {
                publicURL
            }
        }
    `)
    return (
        <div className="siteContainer">
            <div className="siteMainContent">
                <LeftSideBar site={data.site} image={data.image}/>
                <div className="postContainer">
                    <div className="aboutContainer">
                        hello and welcome to my travel and food blog! i love trying foods in new places, so i decided to make a blog out of it. this is still very much a work in progress, but hopefully you'll find something of interest here :) ☆ 
                        <br /><br />
                        (follow my <a target="_blank" href="https://www.instagram.com/clarityeats/">instagram</a> and <a target="_blank" href="https://www.youtube.com/@clarityeats">youtube</a> for more content!)
                        <br /><br />
                        <i>all images on this site are my own unless stated otherwise. logo and icon art commission created by <a target="_blank" href="https://twitter.com/jiefinch">@jiefinch</a></i>.
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}