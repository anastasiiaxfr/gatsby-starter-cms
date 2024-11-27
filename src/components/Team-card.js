import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Socials from "../components/Socials";

function TeamCard({ data }) {
    
    return (
        <figure className="team" >
            <GatsbyImage image={getImage(data.ava)} alt="A dinosaur" />
            <figcaption className="team-overlay">
                <Socials data={data.contacts} />
                <div className="team-content">
                    <div className="team-title">{data.title}</div>
                    <div className="team-info">{data.job}</div>
                </div>
            </figcaption>
        </figure>
    )
}

export default TeamCard