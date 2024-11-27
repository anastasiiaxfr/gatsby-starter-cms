import React from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/Seo";
import { graphql } from "gatsby";

function Cookie({ data }) {
  // Access the title and html content from the first node in the data
  const { html } = data.allMarkdownRemark.nodes[0];
  const { title } = data.allMarkdownRemark.nodes[0].frontmatter;
  const { allCategories } = data;

  return (
    <Layout categories={allCategories.distinct}>
      <div className="page container max-w-6xl">
        <h1>{title}</h1>
        {/* Render the HTML content */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
}

export const Head = () => <SEO title="Cookie Policy" />;

export const query = graphql`
  query Cookie {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/src/markdown/terms/cookie/" } }) {
      nodes {
        frontmatter {
          title
        }
        html
      }
    }
    allCategories: allMarkdownRemark {
      distinct(field: { frontmatter: { category: SELECT } })
    }
  }
`;

export default Cookie;
