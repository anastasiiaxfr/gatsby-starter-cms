import React from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/Seo";
import { graphql } from "gatsby";
import Builder from "../components/Builder";

function Policy({ data }) {
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
  query Policy {
    contentfulTerms(slug: {in: "privacy-policy"}) {
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

export default Policy;
