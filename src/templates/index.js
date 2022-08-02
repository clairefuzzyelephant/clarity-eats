import React, {useState} from "react"
import { graphql } from "gatsby"
import "../styling/index.css";

import Blog from "./blog";
import LeftSideBar from "./left-sidebar.js";
import Footer from "./Footer.js";
import Menu from "./Menu.js";
import SearchResults from "./SearchResults";
import { Helmet } from "react-helmet";

export default function Home({data, pageContext}) {

  const {site, image, blog} = data;

  const { titles, links } = pageContext;

  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryLabel, setSearchQueryLabel] = useState("");

  const [gridView, setGridView] = useState(false);

  const getSearchResults = (query) => {
    var index = window.__FLEXSEARCH__.en.index
    var store = window.__FLEXSEARCH__.en.store
    if (!query || !index) {
      return []
    } else {
      query = query.trim()
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

  function search(query, queryLabel=null) {
    let res;
    res = getSearchResults(query)
    setResults(res);
    setSearchQuery(query);
    if (queryLabel) {
      setSearchQueryLabel(queryLabel);
    } else {
      setSearchQueryLabel(null);
    }
  }
    function clearSearch() {
      setSearchQuery('');
      setResults([]);
    }

    function switchView() {
      setGridView(!gridView);
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>clarity eats</title>
      </Helmet>
      <div className="siteContainer">
        <div className="siteMainContent">
          <LeftSideBar site={site} image={image} titles={titles} links={links}/>
          <div className="postContainer">
            <Menu searchFunction={search} clearSearch={clearSearch} switchView={switchView} isGrid={gridView} isFiltering={searchQuery.length > 0}/>
            {searchQuery.length > 0 ? 
              <SearchResults results={results} searchQuery={searchQuery} queryLabel={searchQueryLabel} /> 
              : <Blog data={blog.posts} context={pageContext} isGrid={gridView} />}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query MetadataQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    image: file(base: {eq: "totoro-gif2music.gif" }) {
      publicURL
    }
    blog: allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      posts: nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "LL")
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
