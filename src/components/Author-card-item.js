import React from 'react'
import { Link } from "gatsby";
import Socials from "./Socials";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaArrowRightLong } from "react-icons/fa6";

function Card({ data }) {
    return (
        <figure className="author">
            <div className="author-img">
                <GatsbyImage image={getImage(data.ava)} />
            </div>
            <div className="author-title">
                {data.name}

            </div>
            <div className="author-info">
                {data.job}
            </div>
            <div className="author-desc">
                {data.excerpt?.excerpt}
            </div>

            <Socials data={data} />

            <Link className="btn_light" to={`/authors/${data.slug}`}>
                View Profile <FaArrowRightLong />
            </Link>

        </figure>
    )
}

export default Card