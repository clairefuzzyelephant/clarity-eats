import React, {useState} from "react"
import { graphql, Link } from "gatsby"
import "../styling/index.css";

import Blog from "./blog";
import LeftSideBar from "../templates/left-sidebar";
import Img from "gatsby-image";

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
      let imgs = {};
      for (let i = 0; i < results.length; i++) {
        for (let j = 0; j < blog.posts.length; j++) {
          console.log(results[i].title)
          console.log(blog.posts[j].frontmatter.title)
          if (results[i].title == blog.posts[j].frontmatter.title) {
            console.log(blog.posts[j].frontmatter.featuredImage.childImageSharp.fluid);
            imgs[results[i].title] = blog.posts[j].frontmatter.featuredImage.childImageSharp.fluid;
          }
        }
      }
      return results.map((page, i) => (
        <div key={i}>
          <Link className="item-search" to={page.url}>
            <div><img alt="" src={imgs[page.title].src} /></div>
            {/* <Img src={imgs[page.title]} alt="" /> */}
            <div>
              <h4>{page.title}</h4>
              <p>{page.body.slice(0, 140) + "..."}</p>
            </div>
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
