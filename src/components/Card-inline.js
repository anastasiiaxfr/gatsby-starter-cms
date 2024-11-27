import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaRegCalendarAlt } from "react-icons/fa";

function Article({ data, name = "card", showImg = true, lgDesc = false, desc = true }) {
  let img = getImage(data.thumb);

  return (
    <article className={name}>
      {showImg ? (
        <div className="card-img">
          <Link className="" to={`/news/${data.slug}`}>
            <GatsbyImage image={img} alt="A dinosaur" />
          </Link>
          <div className="card-info">
            <Link to={`/category/${data.category.toLowerCase().replace(/\s+/g, "-")}`} className="chip">
              {data.category}
            </Link>
          </div>
        </div>
      ) : (
        <div className="card-info">
          <Link to={`/category/${data.category.toLowerCase().replace(/\s+/g, "-")}`} className="chip">
            {data.category}
          </Link>
        </div>
      )}

      <div className="card-container">
        <Link className="card-content" to={`/news/${data.slug}`}>
          <div className="card-date">
            <FaRegCalendarAlt />
            <time dateTime={data.date}>
              {new Date(data.date).getFullYear()}-{String(new Date(data.date).getMonth() + 1).padStart(2, "0")}-
              {String(new Date(data.date).getDate()).padStart(2, "0")}
            </time>
            {"|"}
            <small> 10 min read</small>
          </div>
          <div className="card-title">{data.title}</div>
          {desc && <div className="card-desc">{data.exerpt}</div>}
        </Link>
        <div className="card-footer">
          <div className="card-auth">
            By{" "}
            {data.authors.map((author, ind) => (
              <>
                <Link to="/" key={ind} className="card-note">
                  {author}
                </Link>
                {ind < data.authors.length - 1 && " /"}
              </>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Article;
