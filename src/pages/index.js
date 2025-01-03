import * as React from "react";
import Layout from "../components/Layout";
import { SEO } from "../components/Seo";
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Article from "../components/Article";

export default function Home({ data }) {
  const news = data.allContentfulNews.nodes;
  const allCategories = data.allContentfulCategories.nodes;
  console.log('data', data)
  return (
    <Layout categories={allCategories}>
      <div className="container">
        <h1 className="">Breaking news</h1>
        <section className="banners banners_1">
          <Link className="banner" to="https://quick-funds-landing.vercel.app/" target="_blank">
            <StaticImage src="../assets/img/news/banners/b1.jpg" alt="A dinosaur" />
          </Link>
          {news.slice(0, 1).map((i, ind) => (
            <Article data={i} key={ind} showImg={false} lgDesc={true} />
          ))}
        </section>
        <section className="cards cards_2">
          {news.slice(1, 4).map((i, ind) => (
            <Article
              data={i}
              key={ind}
              showImg={ind === 0 || ind == 1 || ind === 2 ? false : true}
              name={`card ${ind === 0 ? "card-lg" : ""}`}
              lgDesc={ind === 0 ? true : false}
            />
          ))}
        </section>

        <h2 className="h1">Latest News</h2>
        <section className="cards cards_3">
          {news.slice(4, 8).map((i, ind) => (
            <Article data={i} key={ind} />
          ))}
        </section>
        <h2 className="h1">Analytics</h2>
        <section className="cards cards_1">
          {news.slice(8, 14).map((i, ind) => (
            <Article
              data={i}
              key={ind}
              name={`card ${ind === 0 ? "card-lg-l" : ""} ${ind === 1 ? "card-lg-r" : ""}`}
            />
          ))}
        </section>
      </div>
    </Layout>
  );
}

export const Head = () => <SEO />;
export const query = graphql`
query allNews {
  allContentfulNews(sort: {createdAt: DESC}) {
    nodes {
      id
      slug
      title
      read
      createdAt(fromNow: false)
      description {
        description
      }
      thumbnail {
        description
        gatsbyImageData(height: 300, width: 600, layout: CONSTRAINED)
      }
      category {
        title
      }
      author {
        name
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
