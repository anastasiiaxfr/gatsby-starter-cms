import React from "react";
import Card from "./Article-sm";
import Networks from "./Networks";
import AuthorCard from "./Author-card";

export default function Sidebar({ data, currentAuthors }) {

  return (
    <aside className="sidebar">
      {/* Author Card */}
      <AuthorCard data={currentAuthors} />

      {/* Latest Posts */}
      <section className="sidebar-block">
        <h2>Latest Posts</h2>
        <div className="sidebar-post">
          {data.slice(0, 5).map((i, ind) => (
            <Card key={ind} data={i} />
          ))}
        </div>
      </section>

      {/* Stay In Touch */}
      <section className="sidebar-block text-center">
        <h2>Stay In Touch</h2>
        <Networks />
      </section>
    </aside>
  );
}
