import React from "react";
import { Link } from "gatsby";
import Logo from "../components/Logo";
import { SEO } from "../components/Seo";

import Socials from "../components/Socials";
import "../assets/styles/404.sass";

function NotFound() {
  return (
    <div className="page-error">
      <Logo />
      <Socials />
      <h1 className="page-error__title">404</h1>
      <p>
        Sorry, we couldn't fint that page
      </p>
      <Link to="/" className="btn">Go to Home</Link>

    </div>
  );
}

export default NotFound;
export const Head = () => <SEO title="404 Page" />;
