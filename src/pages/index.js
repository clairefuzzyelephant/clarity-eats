import React, {useState} from "react"
import { graphql, Link } from "gatsby"
import "../styling/index.css";

import Blog from "./blog";
import LeftSideBar from "../templates/left-sidebar.js";
import Subscribe from "../templates/Subscribe.js";
import Menu from "../templates/Menu.js";

export default function Home(
  {data: {
        blog,
        site,
        image
    }}
    ,) {

  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getSearchResults = (query) => {
    var index = window.__FLEXSEARCH__.en.index
    var store = window.__FLEXSEARCH__.en.store
    if (!query || !index) {
      return []
    } else {
      let tempResults = []
      Object.keys(index).forEach(idx => {
        tempResults.push(...index[idx].values.search(query))
      })

      tempResults = Array.from(new Set(tempResults))

      var nodes = store
        .filter(node => (tempResults.includes(node.id) ? node : null))
        .map(node => node.node)

      return nodes
    }
  }

  function search(query) {
    let res;
    if (query.length > 2) {
      res = getSearchResults(query)
      setResults(res);
      setSearchQuery(query);
    }
  }

  const ResultList = () => {
    if (results.length > 0) {
      let imgs = {};
      for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < blog.posts.length; j++) {
          if (results[i].title === blog.posts[j].frontmatter.title) {
            imgs[results[i].title] = blog.posts[j].frontmatter.featuredImage.childImageSharp.fluid;
          }
        }
      }
      return (
      <>
      <Menu searchFunction={search} clearSearch={clearSearch}/>
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
        <div>
          <Menu searchFunction={search} clearSearch={clearSearch}/>
          {"No results for " + searchQuery}
        </div>
      );
    } else if (
      results.length === 0 &&
      searchQuery.length > 0
    ) {
      return (
        <div>
          <Menu searchFunction={search} clearSearch={clearSearch}/>
          {"please enter at least 3 characters."}
        </div>
      );
    } else {
      return null;
    }
  }

  function clearSearch() {
    setSearchQuery('');
    setResults([]);
  }


  return (
    <div>
      <div className="siteContainer">
        <LeftSideBar site={site} image={image} />
        <div className="postContainer">
          {searchQuery.length > 0 ? <ResultList /> : <Blog searchFunction={search} clearSearch={clearSearch}/>}
        </div>
      </div>
      {/* <div className="footer">
        <p>Subscribe for email updates!</p>
        <Subscribe />
      </div> */}
    </div>
  )
}

export const pageQuery = graphql`
  query MetadataQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    image: file(base: {eq: "runningTotoro.gif" }) {
      publicURL
    }
    blog: allMarkdownRemark {
      posts: nodes {
        fields {
          slug
        }
        frontmatter {
          date(fromNow: true)
          title
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        excerpt
        id
      }
    }
  }
`
