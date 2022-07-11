import React, {useState} from "react"
import { graphql, Link } from "gatsby"
import "../styling/index.css";

import Blog from "./blog";
import LeftSideBar from "../templates/left-sidebar";

export default function Home(
  {data: {
        blog,
        site,
        image
    }}
    ,) {

  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
      console.log(res);
      setResults(res);
      setSearchQuery(query);
    } else {
      setResults([]);
      setSearchQuery([]);
    }
  }

  const ResultList = () => {
    if (results.length > 0) {
      return results.map((page, i) => (
        <div className="item-search" key={i}>
          <Link to={page.url} className="link">
            <h4>{page.title}</h4>
          </Link>
        </div>
      ))
    } else if (searchQuery.length > 2) {
      return 'No results for ' + searchQuery
    } else if (
      results.length === 0 &&
      searchQuery.length > 0
    ) {
      return 'Please insert at least 3 characters'
    } else {
      return null
    }
  }

  function clearSearch() {
    console.log("clearing");
    setSearchQuery('');
    setResults([]);
  }


  return (
    <div className="siteContainer">
      <LeftSideBar site={site} image={image} searchFunction={search} clearSearch={clearSearch} />
      <div className="postContainer">
        {results.length ? <ResultList /> : <Blog blog={blog} />}
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
