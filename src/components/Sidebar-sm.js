import React from "react";
import Networks from "./Networks";
import Card from "../components/Author-card-item";

export default function Sidebar({ currentAuthors, authors }) {
  const currentAuthorData = authors.find((author) =>
    author.name === currentAuthors.name 
  );

  console.log('currentAuthorsc', currentAuthorData)
  return (
    <aside className="sidebar">
     <section className="authors">
        <Card data={currentAuthorData} />
      </section>
      <section className="sidebar-block text-center">
        <h2>Stay In Touch</h2>
        <Networks />
      </section>
    </aside>
  );
}
