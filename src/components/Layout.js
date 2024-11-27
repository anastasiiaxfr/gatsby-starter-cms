import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import "../assets/styles/styles.sass";

function Layout({ categories, children }) {
  return (
    <>
      <div className="page-wrapper">
        <Header categories={categories} />
        <main className="page-main">{children}</main>
      </div>
      <Footer />
    </>
  );
}
export default Layout;
