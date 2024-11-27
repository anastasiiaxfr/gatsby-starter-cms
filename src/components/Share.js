import React from "react";
import { Link } from "gatsby";
// import { Tooltip as ReactTooltip } from "react-tooltip";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";

function Share({ data }) {
  const socPost = [
    {
      icon: <FaFacebookF />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data)}`,
      label: "Facebook",
    },
    {
      icon: <FaXTwitter />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(data)}`,
      label: "Twitter",
    },
    {
      icon: <FaTelegramPlane />,
      url: `https://t.me/share/url?url=${encodeURIComponent(data)}`,
      label: "Telegram",
    },
    {
      icon: <IoShareSocial />,
      url: "#",
      label: data,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard
      .writeText(window.location.href) 
      .then(() => {
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <nav className="soc">
      {socPost.map((i, ind) => (
        <Link target="_blank" to={i.url} key={ind} data-tooltip-id={`tooltip-${ind}`} className="relative"  onClick={handleCopy}>
          {i.icon}
          {/* <ReactTooltip id={`tooltip-${ind}`} place="top" content={i.label} /> */}
        </Link>
      ))}
    </nav>
  );
}

export default Share;
