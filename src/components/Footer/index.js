import React from "react";
import { Link } from "gatsby";
import Socials from "../Socials";
import Logo from "../Logo";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

const contacts = [
  { icon: <MdAlternateEmail />, url: "mailto:xforeal.news@gmail.com", label: "xforeal.news@gmail.com" },
  { icon: <BsFillTelephoneFill />, url: "tel:+380630633226", label: "+38 063 063 32 26" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <Logo />
          <nav className="footer-menu">
            <Link to="/terms">Trems of use</Link>
            <Link to="/policy">Privacy policy</Link>
            <Link to="/cookie">Cookie policy</Link>
            <Link to="/sitemap">Sitemap</Link>
            <Link to="/about-us">About Us</Link>
          </nav>
          <Socials />
        </div>
      </div>

      <div className="footer-mdl">
        <div className="container">
          <nav className="contacts">
            {contacts.map((i, ind) => (
              <Link to={i.url} key={ind}>
                {i.icon}
                <span>{i.label}</span>
              </Link>
            ))}
          </nav>
          <span>&copy; 2024 XFR.News. All rights reserved</span>
        </div>
      </div>
      <div className="footer-btm">
        <div className="container"></div>
      </div>
    </footer>
  );
}

export default Footer;
