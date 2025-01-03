import React from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/Seo";
import { graphql } from "gatsby";
import Builder from "../components/Builder";

function Terms({ data }) {
  const allCategories = data.allContentfulCategories.nodes;
  const page = data.contentfulTerms;
  return (
    <Layout categories={allCategories}>
      <div className="page container max-w-6xl">
        <h1>{page.title}</h1>
        <Builder post={page} />
      </div>
    </Layout>
  );
}

export const Head = () => <SEO title="Terms of Services" />;

export const query = graphql`
  query Terms {
    contentfulTerms(slug: {in: "terms-of-service"}) {
        title
        content {
          raw
        }
        slug
    }
    allContentfulCategories {
      nodes {
        title
        slug
      }
   } 
  }
`;

export default Terms;
