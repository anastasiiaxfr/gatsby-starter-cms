import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaRegCalendarAlt } from "react-icons/fa";

function Card({ data }) {
  let img = getImage(data.thumb);
  return (
    <article className="card_row">
      <div className="card-img">
        <Link className="" to={`/news/${data.slug}`}>
          <GatsbyImage image={img} alt={data.title} className="h-full" />
        </Link>
      </div>
      <Link className="card-content" to={`/news/${data.slug}`}>
        <div className="card-title">{data.title}</div>
        <div className="card-date">
          <FaRegCalendarAlt />
          <time dateTime={data.date}>
            {new Date(data.date).getFullYear()}-{String(new Date(data.date).getMonth() + 1).padStart(2, "0")}-
            {String(new Date(data.date).getDate()).padStart(2, "0")}
          </time>{" "}
        </div>
      </Link>
    </article>
  );
}

export default Card;
