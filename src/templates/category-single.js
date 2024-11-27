import React from "react";
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Card from "../components/Article";
import Pagination from "../components/Pagination";

const CategoryTemplate = ({ data, pageContext }) => {
  // const posts = data.allMarkdownRemark.edges;
  //console.log("category", data);
  const { category } = pageContext;
  const { numPages, currentPage } = pageContext;

  const { allCategories } = data;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout categories={allCategories.distinct}>
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

          {posts.map(({ node }) => (
            <Card
              key={node.id}
              data={node.frontmatter}
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
    allMarkdownRemark(filter: { frontmatter: { category: { eq: $category } } }, skip: $skip, limit: $limit) {
      edges {
        node {
          id
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
        }
      }
    }
    allCategories: allMarkdownRemark {
      distinct(field: { frontmatter: { category: SELECT } })
    }
  }
`;

export default CategoryTemplate;
