import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Article from "../../components/Article";
import Pagination from "../../components/Pagination";

function News({ data, pageContext }) {
  const news = data.allMarkdownRemark.nodes;
  const { allCategories } = data;
  const { numPages, currentPage } = pageContext;

  return (
    <Layout categories={allCategories.distinct}>
      <div className="container">

        <h2 className="h1">Latest News</h2>
        <section className="cards cards_3">
          {news.map((i, ind) => (
            <Article data={i.frontmatter} key={ind} />
          ))}
        </section>
        {/* {<Pagination numPages={numPages} currentPage={currentPage} part="news" />} */}

      </div>
    </Layout>
  );
}

export default News;

export const query = graphql`
  query allNews {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/src/markdown/news//" } }) {
      nodes {
        frontmatter {
          title
          authors
          category
          exerpt
          date
          slug
          thumb {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        id
      }
    }
    allCategories: allMarkdownRemark {
      distinct(field: { frontmatter: { category: SELECT } })
    }
  }
`;
