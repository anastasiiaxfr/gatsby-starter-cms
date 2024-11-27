import React from "react";
import Layout from "../components/Layout";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SEO } from "../components/Seo";
import Sidebar from "../components/Sidebar";
import Share from "../components/Share";
import { FaRegCalendarAlt, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { Helmet } from "react-helmet";  

function SingleNews({ data }) {
  const { markdownRemark, latestNews, allAuthors, allCategories, site } = data;
  const { title, authors, category, date, exerpt, thumb, slug } =
    markdownRemark.frontmatter;
  const img = getImage(thumb);

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
        "name": title,
        "item": `${site.siteMetadata.siteUrl}/news/${slug}`,
      },
    ],
  };

  return (
    <Layout categories={allCategories.distinct}>
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
            {title.length > 50 ? `${title.slice(0, 50)}...` : title}
          </li>
        </ul>
        <article className="page-single">
          <section className="post">
            <GatsbyImage image={img} alt={title} className="post-poster" />

            <div className="post-header">
              <div className="post-header-inner">
                <Link className="chip" to="/">
                  {category}
                </Link>
                <div className="post-authors">
                  By
                  {authors.map((author, index) => (
                    <span key={index} className="post-author">
                      <b>
                        <Link to="/">{author}</Link>
                      </b>
                      {index < authors.length - 1 && " | "}
                    </span>
                  ))}
                </div>
              </div>

              <div className="date">
                <FaRegCalendarAlt />
                <time dateTime={date}>
                  {new Date(date).getFullYear()}-
                  {String(new Date(date).getMonth() + 1).padStart(2, "0")}-
                  {String(new Date(date).getDate()).padStart(2, "0")}
                </time>
                | <small>10 min read</small>
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

            <h1>{title}</h1>
            <div className="post-lead">{exerpt}</div>

            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
            ></div>

            <div className="post-footer">
              <div className="tags">
                <b>Tags: </b>
                <Link to="/">Tag1</Link> / <Link to="/">Tag2</Link>
              </div>

              <Share data={`${site.siteMetadata.siteUrl}/news/${slug}`} />
            </div>
          </section>

          <Sidebar
            data={latestNews.nodes}
            currentAuthors={authors}
            authors={allAuthors.nodes}
          />
        </article>
      </div>
    </Layout>
  );
}

export default SingleNews;

export const Head = ({ data }) => {
  const { markdownRemark } = data;
  const { title, thumb, exerpt, slug } = markdownRemark.frontmatter;

  return (
    <SEO
      title={title}
      image={thumb.childImageSharp.fluid.src}
      description={exerpt}
      link={`/news/${slug}`}
    />
  );
};

export const query = graphql`
  query ($slug: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    latestNews: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/news//" }
        frontmatter: { slug: { ne: $slug } }
      }
      limit: 5
    ) {
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
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
        authors
        category
        date
        exerpt
        thumb {
          childImageSharp {
            gatsbyImageData
            fluid {
              src
            }
          }
        }
      }
    }
    allAuthors: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/markdown/authors//" } }
      limit: 5
    ) {
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
    allCategories: allMarkdownRemark {
      distinct(field: { frontmatter: { category: SELECT } })
    }
  }
`;
