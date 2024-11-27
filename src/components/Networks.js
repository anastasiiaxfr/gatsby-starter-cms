import React from 'react';
import { Link } from 'gatsby';
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

const soc = [
    {
        label: 'Facebook', icon: <FaFacebookF />
        , url: '/', name: 'soc-1'
    },
    {
        label: 'Twitter', icon: <FaXTwitter />
        , url: '/', name: 'soc-2'
    },
    {
        label: 'Linkedin', icon: <FaLinkedinIn />, url: '/', name: 'soc-3'
    },
    {
        label: 'Youtube', icon: <FaYoutube />
        , url: '/', name: 'soc-4'
    },
    {
        label: 'Tiktok', icon: <FaTiktok />, url: '/', name: 'soc-5'
    },
    {
        label: 'Email', icon: <MdAlternateEmail />, url: '/', name: 'soc-6'
    },

]

function Networks() {
  return (
    <nav className="networks">
        {soc.map((i, ind) => (
            <Link to={i.url} target="_blank" key={ind} className="network" title={i.label}>
                <div className={`network-icon ${i.name}`}>
                {i.icon}
                </div>
                <div className="network-label"><small>{i.label}</small></div>
            </Link>
        ))}
    </nav>
  )
}

export default Networks