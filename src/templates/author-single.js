import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar-sm";
import Card from "../components/Card-inline";
import Pagination from "../components/Pagination";

const AuthorTemplate = ({ data, pageContext }) => {
  const { author } = pageContext; 
  const { numPages, currentPage } = pageContext;

  const posts = data.allContentfulNews.nodes; 
  const allAuthors = data.allContentfulAuthors.nodes; 
  const allCategories = data.allContentfulCategories.nodes; 

  console.log('author ', data )
  return (
   <Layout categories={allCategories}>
       <div className="container">
        <article className="page-single">
          <section className="post">
            <h1>Posts by <b className="text-main">{author.name}</b></h1>
            
            {/* Display the author's posts */}
            <div className="posts">
              {posts.map((post) => (
                <Card key={post.id} data={post} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination numPages={numPages} currentPage={currentPage} data={author.name} part="authors" />
          </section>

          {/* Sidebar */}
          <Sidebar currentAuthors={author} authors={allAuthors} />
        </article>
      </div>
   </Layout>
  );
};

export const pageQuery = graphql`
 query($authorName: String, $skip: Int, $limit: Int) {
  allContentfulNews(
    filter: {author: {elemMatch: {name: {eq: $authorName}}}}
    skip: $skip
    limit: $limit
  ) {
    nodes {
      id
      title
      slug
      read
      category {
        title
      }
      createdAt
      description {
        description
      }
      author {
        name
        slug
      }
      thumbnail {
        gatsbyImageData(width: 600, height: 400, layout: CONSTRAINED)
      }
    }
  }

  allContentfulCategories {
    nodes {
      title
      slug
    }
  }

  allContentfulAuthors {
    nodes {
      name
      job
      excerpt {
        excerpt
      }
      ava {
        gatsbyImageData(width: 400, height: 400, layout: CONSTRAINED)
      }
      facebook
      linkedin
      slug
      discord
      email
    }
  }
}
`;

export default AuthorTemplate;
