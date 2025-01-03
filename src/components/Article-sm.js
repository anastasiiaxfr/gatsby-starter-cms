import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { FaRegCalendarAlt } from "react-icons/fa";

function Card({ data }) {
  return (
    <article className="card_row">
      <div className="card-img">
        <Link className="" to={`/news/${data.slug}`}>
          <GatsbyImage image={data.thumbnail.gatsbyImageData}
              alt={data.thumbnail.description || data.title} className="h-full" />
        </Link>
      </div>
      <Link className="card-content" to={`/news/${data.slug}`}>
        <div className="card-title">{data.title}</div>
        <div className="card-date">
          <FaRegCalendarAlt />
          <time dateTime={data.createdAt}>
            {new Date(data.createdAt).getFullYear()}-{String(new Date(data.createdAt).getMonth() + 1).padStart(2, "0")}-
            {String(new Date(data.createdAt).getDate()).padStart(2, "0")}
          </time>{" "}
        </div>
      </Link>
    </article>
  );
}

export default Card;
