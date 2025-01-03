import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { FaRegCalendarAlt } from "react-icons/fa";

const truncateText = (text, length) => {
  return text?.length > length ? `${text.substring(0, length)}...` : text;
};

function Article({ data, name = "card", showImg = true, lgDesc = false, desc = true }) {
  const truncatedExcerpt = truncateText(data.description?.description, lgDesc ? 300 : 100);
  return (
    <article className={name}>
      {showImg ? (
        <div className="card-img">
          <Link className="" to={`/news/${data.slug}`}>
            <GatsbyImage
              image={data.thumbnail.gatsbyImageData}
              alt={data.thumbnail.description || data.title}
              className="thumbnail-image"
            />
          </Link>
          {data.category && <div className="card-info">
            <Link to={`/category/${data.category.title.toLowerCase()}`} className="chip">
              {data.category.title}
            </Link>
          </div>}
        </div>
      ) : (
        <div className="card-info">
          {data.category && <Link to={`/category/${data.category.title.toLowerCase()}`} className="chip">
            {data.category.title}
          </Link>}
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
          {desc && <div className="card-desc">{truncatedExcerpt}</div>}
        </Link>
        <div className="card-footer">
          <div className="card-auth">
            By{" "} {data.author !== null ?
              data.author?.map((i, ind) => (
                <>
                  <Link to="/" key={ind} className="card-note">
                    {i.name}
                  </Link>
                  {ind < data.author.length - 1 && " /"}
                </>
              )) : "XFR"}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Article;
