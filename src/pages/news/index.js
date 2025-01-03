import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Article from "../../components/Article";
import Pagination from "../../components/Pagination";

function News({ data, pageContext }) {
  const news = data.allContentfulNews.nodes;
  const allCategories = data.allContentfulCategories.nodes;
  const { numPages, currentPage } = pageContext;

  console.log(data)

  return (
    <Layout categories={allCategories}>
      <div className="container">

        <h2 className="h1">Latest News</h2>
        <section className="cards cards_3">
          {news.map((i, ind) => (
            <Article data={i} key={ind} />
          ))}
        </section>
        {/* {<Pagination numPages={numPages} currentPage={currentPage} part="news" />} */}

      </div>
    </Layout>
  );
}

export default News;

export const query = graphql`
query allNewsParent {
  allContentfulNews(sort: {createdAt: DESC}, limit: 50) {
    nodes {
      slug
      title
      createdAt
      read
      author {
        name
      }
      description {
        description
      }
      thumbnail {
        gatsbyImageData(width: 600, height: 300, layout: CONSTRAINED)
      }
    }
  }

  allContentfulCategories {
      nodes {
        title
        slug
      }
    }
  }
`;