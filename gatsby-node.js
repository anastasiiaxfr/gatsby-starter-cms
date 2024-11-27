const path = require("path");

exports.createPages = async function({ actions, graphql }) {
  const { createPage } = actions;

  // Query to get all unique categories from markdown files
  const categoryResult = await graphql(`
    query {
      allMarkdownRemark {
        distinct(field: { frontmatter: { category: SELECT } })
      }
    }
  `);

  if (categoryResult.errors) {
    console.log("Error fetching categories:", categoryResult.errors);
    return;
  }

  const categories = categoryResult.data.allMarkdownRemark.distinct;

  // Create paginated category pages
  categories.forEach(async (category) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-"); // Generate a slug for the category

    // Query for all posts in the category to paginate
    const postsResult = await graphql(`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { category: { eq: "${category}" } } }
          limit: 500
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                slug
              }
            }
          }
        }
      }
    `);

    if (postsResult.errors) {
      console.log(`Error fetching posts for category: ${category}`, postsResult.errors);
      return;
    }

    const posts = postsResult.data.allMarkdownRemark.edges;
    const postsPerPage = 8; // Define how many posts per page
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, pageIndex) => {
      const currentPage = pageIndex + 1;
      const pagePath = currentPage === 1 ? `/category/${categorySlug}/` : `/category/${categorySlug}/${currentPage}`;

      // Create the paginated category page
      createPage({
        path: pagePath,
        component: path.resolve("./src/templates/category-single.js"), // Path to the category template
        context: {
          category,
          limit: postsPerPage, // Number of posts per page
          skip: pageIndex * postsPerPage, // Skip posts for pagination
          numPages,
          currentPage, // Current page number
        },
      });
    });
  });

  // Query to get all unique authors from markdown files
  const authorResult = await graphql(`
    query {
      allMarkdownRemark {
        distinct(field: { frontmatter: { authors: SELECT } })
      }
    }
  `);

  if (authorResult.errors) {
    console.log("Error fetching authors:", authorResult.errors);
    return;
  }

  const authors = authorResult.data.allMarkdownRemark.distinct;

  // Create paginated author pages
  authors.forEach(async (author) => {
    const authorSlug = author.toLowerCase().replace(/\s+/g, "-"); // Generate a slug for the author

    // Query for all posts by this author to paginate
    const postsResult = await graphql(`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { authors: { eq: "${author}" } } }
          limit: 500
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                slug
              }
            }
          }
        }
      }
    `);

    if (postsResult.errors) {
      console.log(`Error fetching posts for author: ${author}`, postsResult.errors);
      return;
    }

    const posts = postsResult.data.allMarkdownRemark.edges;
    const postsPerPage = 3; // Define how many posts per page
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, pageIndex) => {
      const currentPage = pageIndex + 1;
      const pagePath = currentPage === 1 ? `/authors/${authorSlug}/` : `/authors/${authorSlug}/${currentPage}`;

      // Create the paginated author page
      createPage({
        path: pagePath,
        component: path.resolve("./src/templates/author-single.js"), // Path to the author template
        context: {
          author,
          limit: postsPerPage, // Number of posts per page
          skip: pageIndex * postsPerPage, // Skip posts for pagination
          numPages,
          currentPage, // Current page number
        },
      });
    });
  });

  // Query for all news posts to create individual pages
  const postResult = await graphql(`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/src/markdown/news/" } }) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  if (postResult.errors) {
    console.log("Error fetching posts:", postResult.errors);
    return;
  }

  // Create a page for each individual post
  postResult.data.allMarkdownRemark.nodes.forEach((node) => {
    const postSlug = node.frontmatter.slug;

    createPage({
      path: `/news/${postSlug}`, // URL path for the post page
      component: path.resolve("./src/templates/news-single.js"), // Template for news post page
      context: { slug: postSlug }, // Pass post slug to template
    });
  });
};