import React, {useState} from "react"
import { graphql } from "gatsby"
import "../styling/index.css";

import Blog from "./blog";
import LeftSideBar from "../templates/left-sidebar.js";
import Footer from "../templates/Footer.js";
import Menu from "../templates/Menu.js";
import SearchResults from "../templates/SearchResults";
import { Helmet } from "react-helmet";

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
    res = getSearchResults(query)
    setResults(res);
    setSearchQuery(query);
  }
    function clearSearch() {
      setSearchQuery('');
      setResults([]);
    }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>clarity eats</title>
      </Helmet>
      <div className="siteContainer">
        <div className="siteMainContent">
          <LeftSideBar site={site} image={image} />
          <div className="postContainer">
            <Menu searchFunction={search} clearSearch={clearSearch}/>
            {searchQuery.length > 0 ? 
              <SearchResults results={results} posts={blog.posts} searchQuery={searchQuery} /> 
              : <Blog />}
          </div>
        </div>
        <Footer />
      </div>
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
