import React from "react";
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Card from "../components/Article";
import Pagination from "../components/Pagination";

const CategoryTemplate = ({ data, pageContext }) => {
  //console.log("category", pageContext);
  const { category } = pageContext;
  const { numPages, currentPage } = pageContext;

  const allCategories = data.allContentfulCategories.nodes;
  const posts = data.allContentfulNews.nodes;

  return (
    <Layout categories={allCategories}>
      <div className="container">
        <h1>
          <b className="text-main">{category}</b> News
        </h1>

        <div className="cards cards_1">
          {(posts.length === 1 || posts.length === 2) && (
            <Link className="banner_lg" to="https://quick-funds-landing.vercel.app/" target="_blank">
              <StaticImage src="../assets/img/news/banners/b1.jpg" alt="A dinosaur" />
            </Link>
          )}

          {posts.map((i) => (
            <Card
              key={i.id}
              data={i}
              name={`card`}
              desc={false}
              showImg={posts.length === 1 || posts.length === 2 ? false : true}
            />
          ))}
        </div>

        {numPages > 1 && <Pagination numPages={numPages} currentPage={currentPage} data={category} part="category" />}
      </div>
    </Layout>
  );
};

// GraphQL page query to fetch posts for the category
export const pageQuery = graphql`
  query($category: String, $skip: Int!, $limit: Int!) {
  allContentfulNews(
    filter: { category: { title: { eq: $category } } }
    skip: $skip
    limit: $limit
  ) {
    nodes {
      id
      slug
      title
      createdAt
      read
      author {
        name
      }
      category {
        title
      }
      description {
        description
      }
      thumbnail {
        gatsbyImageData(width: 600, height: 400, layout: CONSTRAINED)
        description
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

export default CategoryTemplate;
