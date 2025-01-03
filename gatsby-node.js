const path = require("path");

exports.createPages = async function ({ actions, graphql }) {
  const { createPage } = actions;

  // Query to get all categories from Contentful
 const categoryResult = await graphql(`
    query {
      allContentfulCategories {
        nodes {
          title
          slug
        }
      }
    }
  `);

  if (categoryResult.errors) {
    console.log("Error fetching categories:", categoryResult.errors);
    return;
  }

  const categories = categoryResult.data.allContentfulCategories.nodes;

  // Create paginated category pages
  for (const category of categories) {
    // Ensure category slug is safe
    const categorySlug = category.slug ? category.slug : "default-category";

    // Query for posts in this category
    const postsResult = await graphql(`
      query($category: String) {
        allContentfulNews(filter: { category: { title: { eq: $category } } }) {
          nodes {
            id
            title
            slug
          }
        }
      }
    `, {
      category: category.title,
    });

    if (postsResult.errors) {
      console.log(`Error fetching posts for category: ${category.title}`, postsResult.errors);
      continue;
    }

    const posts = postsResult.data.allContentfulNews.nodes;
    const postsPerPage = 8; // Number of posts per page
    const numPages = Math.ceil(posts.length / postsPerPage);

    // Create paginated category pages
    for (let pageIndex = 0; pageIndex < numPages; pageIndex++) {
      const currentPage = pageIndex + 1;
      const pagePath = currentPage === 1 
        ? `/category/${categorySlug}/` 
        : `/category/${categorySlug}/${currentPage}`;

      createPage({
        path: pagePath,
        component: path.resolve("./src/templates/category-single.js"),
        context: {
          category: category.title,
          limit: postsPerPage,
          skip: pageIndex * postsPerPage,
          numPages,
          currentPage,
        },
      });
    }
  }


  // Query for all posts from Contentful to create individual post pages
  const postResult = await graphql(`
    query {
      allContentfulNews {
        nodes {
          slug
        }
      }
    }
  `);

  if (postResult.errors) {
    console.log("Error fetching posts:", postResult.errors);
    return;
  }

  // Create a page for each individual post
  for (const node of postResult.data.allContentfulNews.nodes) {
    const postSlug = node.slug;

    createPage({
      path: `/news/${postSlug}`, // URL path for the post page
      component: path.resolve("./src/templates/news-single.js"), // Template for news post page
      context: { slug: postSlug }, // Pass post slug to template
    });
  }



  // Query to get all authors from Contentful

  const authorResult = await graphql(`
    query {
      allContentfulAuthors {
        nodes {
          name
          slug  
        }
      }
    }
  `);

  if (authorResult.errors) {
    console.log("Error fetching authors:", authorResult.errors);
    return;
  }

  const authors = authorResult.data.allContentfulAuthors.nodes;

  // Create paginated author pages
  for (const author of authors) {
    // Use author.slug if it's available, otherwise generate slug from name
    const authorSlug = author.slug;

    // Query for all posts by this author to paginate
    const postsResult = await graphql(`
      query($authorSlug: String!) {
        allContentfulNews(
        filter: {author: {elemMatch: {slug: {eq: $authorSlug }}}}){
          nodes {
            id
            title
            slug
          }
        }
      }
    `, {
      authorSlug: authorSlug,  
    });


    if (postsResult.errors) {
      console.log(`Error fetching posts for author: ${author.name}`, postsResult.errors);
      continue;
    }

    const posts = postsResult.data.allContentfulNews.nodes;
    const postsPerPage = 3; // Number of posts per page
    const numPages = Math.ceil(posts.length / postsPerPage);

    // Create paginated author pages
    for (let pageIndex = 0; pageIndex < numPages; pageIndex++) {
      const currentPage = pageIndex + 1;
      const pagePath = currentPage === 1 
        ? `/authors/${authorSlug}/` 
        : `/authors/${authorSlug}/${currentPage}`;

      createPage({
        path: pagePath,
        component: path.resolve("./src/templates/author-single.js"),
        context: {
          author,
          authorName: author.name,
          limit: postsPerPage,
          skip: pageIndex * postsPerPage,
          numPages,
          currentPage,
        },
      });
    }
  }

};


