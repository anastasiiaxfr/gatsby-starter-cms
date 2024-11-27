import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar-sm";
import Card from "../components/Card-inline";
import Pagination from "../components/Pagination";

const AuthorTemplate = ({ data, pageContext }) => {
  const { author } = pageContext;
  const { numPages, currentPage } = pageContext;

  const posts = data.allMarkdownRemark.edges;
  const { allCategories, allAuthors } = data;

  return (
    <Layout categories={allCategories.distinct}>
      <div className="container">
        <article className="page-single">
          <section className="post">
            <h1>
              Posts by <b className="text-main">{author}</b>
            </h1>
            <div className="posts">
              {posts.map(({ node }) => (
                <Card key={node.id} data={node.frontmatter} />
              ))}
            </div>

            {/* Pagination links */}
            {<Pagination numPages={numPages} currentPage={currentPage} data={author} part="authors" />}
          </section>

          <Sidebar currentAuthors={author} authors={allAuthors.nodes} />
        </article>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($author: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(filter: { frontmatter: { authors: { eq: $author } } }, skip: $skip, limit: $limit) {
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
    allAuthors: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/src/markdown/authors//" } }, limit: 5) {
      nodes {
        frontmatter {
          slug
          title
          job
          exerpt
          ava {
            childImageSharp {
              gatsbyImageData
            }
          }
          contacts {
            link
            name
          }
        }
      }
    }
  }
`;

export default AuthorTemplate;
