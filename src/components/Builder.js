import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const PostContent = ({ post }) => {
  // Ensure post.content.raw is available and is in the correct structure.
  const options = {
    renderNode: {
      // Customize rendering for specific node types (like hyperlink, blockquote, etc.)
      "embedded-asset-block": (node) => (
        <div className="embedded-asset-block">
          <img src={node.data.target.fields.file.url} alt={node.data.target.fields.title} />
        </div>
      ),
      "embedded-entry-block": (node) => (
        <div className="embedded-entry-block">
          <h3>{node.data.target.fields.title}</h3>
        </div>
      ),
      "hyperlink": (node) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {node.content[0].value}
        </a>
      ),
      // You can add more renderNode options to customize other node types
    },
  };

  return (
    <div className="post-content">
      {post.content.raw ? (
        documentToReactComponents(JSON.parse(post.content.raw), options)
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
};

export default PostContent;