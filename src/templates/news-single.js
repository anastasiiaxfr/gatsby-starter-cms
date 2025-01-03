import React from "react";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SEO } from "../components/Seo";
import Sidebar from "../components/Sidebar";
import Share from "../components/Share";
import { FaRegCalendarAlt, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { Helmet } from "react-helmet";  
import Builder from "../components/Builder";

function SingleNews({ data }) {
  const { site } = data;
  const allCategories = data.allContentfulCategories.nodes;
  const allNews = data.latestNews.nodes;
  const post = data.singleNews;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": site.siteMetadata.siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "News",
        "item": `${site.siteMetadata.siteUrl}/news`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${site.siteMetadata.siteUrl}/news/${post.slug}`,
      },
    ],
  };

  return (
    <Layout categories={allCategories}>
      <div className="container">
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        </Helmet>

        <ul className="breadcrumbs">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li className="active">
            {post.title.length > 50 ? `${post.title.slice(0, 50)}...` : post.title}
          </li>
        </ul>
        <article className="page-single">
          <section className="post">
            <GatsbyImage  image={post.thumbnail.gatsbyImageData}
              alt={post.thumbnail.description || post.title} className="post-poster" />

            <div className="post-header">
              <div className="post-header-inner">
                <Link className="chip" to="/">
                  {post.category.title}
                </Link>
                <div className="post-authors">
                  By
                  {post.author.map((i, index) => (
                    <span key={index} className="post-author">
                      <b>
                        <Link to="/">{i.name}</Link>
                      </b>
                      {index < post.author.length - 1 && " | "}
                    </span>
                  ))}
                </div>
              </div>

              <div className="date">
                <FaRegCalendarAlt />
                <time dateTime={post.createdAt}>
                  {new Date(post.createdAt).getFullYear()}-
                  {String(new Date(post.createdAt).getMonth() + 1).padStart(2, "0")}-
                  {String(new Date(post.createdAt).getDate()).padStart(2, "0")}
                </time>
                | <small>{post.read} min read</small>
              </div>

              <div className="post-actions">
                <button>
                  <FaRegBookmark />
                </button>
                <button>
                  <FaRegHeart />
                </button>
              </div>
            </div>

            <h1>{post.title}</h1>
            
            <div className="post-lead">{post.description.description}</div>
            

            <Builder post={ post }></Builder>

            <div className="post-footer">
              <div className="tags">
                <b>Tags: </b>
                <Link to="/">Tag1</Link> / <Link to="/">Tag2</Link>
              </div>

              <Share data={`${site.siteMetadata.siteUrl}/news/${post.slug}`} />
            </div>
          </section>

          <Sidebar
            data={allNews}
            currentAuthors={post.author}
          />
        </article>
      </div>
    </Layout>
  );
}

export default SingleNews;

export const Head = ({ data }) => {

  return (
    <SEO
      title={data.singleNews.title}
      image={data.singleNews?.thumbnail}
      description={data.singleNews.description.description}
      link={`/news/${data.singleNews.slug}`}
    />
  );
};

export const query = graphql`
query($slug: String) {
  site {
    siteMetadata {
      siteUrl
    }
  }

  latestNews: allContentfulNews(
    filter: { slug: { ne: $slug } }
    limit: 5
  ) {
    nodes {
      id
      slug
      title
      category {
        title
      }
      createdAt
      thumbnail {
        gatsbyImageData(width: 600, height: 400, layout: CONSTRAINED)
        description
        url
      }
    }
  }

  singleNews: contentfulNews(slug: { eq: $slug }) {
    id
    slug
    title
    createdAt
    read
    content {
      raw
    }
    description {
      description
    }
    thumbnail {
      gatsbyImageData(width: 1200, height: 800, layout: CONSTRAINED)
      description
      url
    }
   author {
      name
      job
      slug
      excerpt {
        excerpt
      }
      ava {
        gatsbyImageData(width: 400, height: 400, layout: CONSTRAINED)
      }
      email
      discord
      facebook
      linkedin
    }
    category {
      title
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
