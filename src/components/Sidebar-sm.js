import React from "react";
import Networks from "./Networks";
import AuthorCard from "./Author-card";

export default function Sidaebar({ currentAuthors, authors }) {
  //console.log("dataSidebar", data);
  const filteredAuthors = authors.filter(
    (author) => currentAuthors.includes(author.frontmatter.title) || currentAuthors.includes(author.frontmatter.slug)
  );

  return (
    <aside className="sidebar">
      {/* BEGIN block */}
      <AuthorCard data={filteredAuthors} />
      {/* END block */}

      {/* BEGIN block */}
      <section className="sidebar-block text-center">
        <h2>Stay In Touch</h2>
        <Networks />
      </section>
      {/* END block */}
    </aside>
  );
}
