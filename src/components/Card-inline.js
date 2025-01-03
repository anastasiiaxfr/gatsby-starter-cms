import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaRegCalendarAlt } from "react-icons/fa";

function Article({ data, name = "card", showImg = true, lgDesc = false, desc = true }) {
  return (
    <article className={name}>
      {showImg ? (
        <div className="card-img">
          <Link className="" to={`/news/${data.slug}`}>
            <GatsbyImage image={data.thumbnail.gatsbyImageData}
              alt={data.thumbnail.description || data.title} />
          </Link>
          <div className="card-info">
            <Link to={`/category/${data.category.title.slug}`} className="chip">
              {data.category.title}
            </Link>
          </div>
        </div>
      ) : (
        <div className="card-info">
          <Link to={`/category/${data.category.slug}`} className="chip">
            {data.category.title}
          </Link>
        </div>
      )}

      <div className="card-container">
        <Link className="card-content" to={`/news/${data.slug}`}>
          <div className="card-date">
            <FaRegCalendarAlt />
            <time dateTime={data.createdAt}>
              {new Date(data.createdAt).getFullYear()}-{String(new Date(data.createdAt).getMonth() + 1).padStart(2, "0")}-
              {String(new Date(data.createdAt).getDate()).padStart(2, "0")}
            </time>
            {"|"}
            <small> {data.read} min read</small>
          </div>
          <div className="card-title">{data.title}</div>
          {desc && <div className="card-desc">{data.description.description}</div>}
        </Link>
        <div className="card-footer">
          <div className="card-auth">
            By{" "}
            {data.author.map((author, ind) => (
              <>
                <Link to="/" key={ind} className="card-note">
                  {author.name}
                </Link>
                {ind < data.author.length - 1 && " /"}
              </>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Article;
