import React from "react";
import { Link } from "gatsby";

import "../styling/index.css";

export default function SearchResults({results, posts, searchQuery, queryLabel}) {

  const ResultList = () => {
    if (results.length > 0) {
      let imgs = {};
      for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < posts.length; j++) {
          if (results[i].title === posts[j].frontmatter.title) {
            imgs[results[i].title] = posts[j].frontmatter.featuredImage.childImageSharp.fluid;
          }
        }
      }
      return (
      <>
      {results.map((page, i) => (
          
          <div key={i}>
            <Link className="item-search" to={page.url}>
              <div className="item-search-pic">
                <img alt="" src={imgs[page.title].src} />
              </div>
              <div className="item-search-text">
                <h4>{page.title}</h4>
                <p>{page.body.slice(0, 140) + "..."}</p>
              </div>
            </Link>
          </div>
        
      ))}
      </>);
    } else if (searchQuery.length > 2) {
      return (
        <div className="searchErrorMessage">
          {"no results for " + (queryLabel ?? searchQuery)}
        </div>
      );
    } else if (
      results.length === 0 &&
      searchQuery.length > 0
    ) {
      return (
        <div className="searchErrorMessage">
          {"please enter at least 3 characters."}
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <ResultList /> 
  );
}