import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import Logo from "../Logo";
import ThemeSwitch from "../Theme-switch";
import Drawer from "./Drawer";

import { IoSearchSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

const navByCat = [
  { url: "/", label: "Home" },
  { url: "/", label: "Business" },
  { url: "/", label: "Economic" },
  { url: "/", label: "Sport" },
  { url: "/", label: "Tech" },
  { url: "/", label: "Education" },
  { url: "/", label: "Life" },
  { url: "/", label: "Hobbies & Events" },
];

export default function Header({ categories }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prevState) => (prevState === dropdownName ? null : dropdownName));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="header" ref={headerRef}>
        <div className="header-top">
          <div className="container">
            <Logo />
            <nav className="header-menu">
              <Link to="/contacts">Contacts</Link>
              <Link to="/authors">Authors</Link>
              <Link to="/faq">FAQ</Link>

              <div className="menu-dd" ref={dropdownRef}>
                <button
                  type="button"
                  className="menu-dd-toggle"
                  id="menu-button-terms"
                  aria-expanded={openDropdown === "terms" ? "true" : "false"}
                  aria-haspopup="true"
                  onClick={() => toggleDropdown("terms")}
                >
                  Terms <MdKeyboardArrowDown />
                </button>

                {openDropdown === "terms" && (
                  <nav
                    className="menu-sub"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button-terms"
                    tabIndex="-1"
                  >
                    <Link to="/policy" role="menuitem" onClick={() => setOpenDropdown(null)}>
                      Privacy Policy
                    </Link>
                    <Link to="/terms" role="menuitem" onClick={() => setOpenDropdown(null)}>
                      Terms of Service
                    </Link>
                    <Link to="/cookie" role="menuitem" onClick={() => setOpenDropdown(null)}>
                      Cookie Policy
                    </Link>
                  </nav>
                )}
              </div>
              <div className="menu-dd" ref={dropdownRef}>
                <button
                  type="button"
                  className="menu-dd-toggle"
                  id="menu-button-categories"
                  aria-expanded={openDropdown === "categories" ? "true" : "false"}
                  aria-haspopup="true"
                  onClick={() => toggleDropdown("categories")}
                >
                  Categories <MdKeyboardArrowDown />
                </button>

                {openDropdown === "categories" && (
                  <nav
                    className="menu-sub"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button-categories"
                    tabIndex="-1"
                  >
                    {categories?.map((i, ind) => (
                      <Link
                        to={`/category/${i.toLowerCase().replaceAll(" ", "-")}`}
                        key={ind}
                        role="menuitem"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {i}
                      </Link>
                    ))}
                  </nav>
                )}
              </div>

              
            </nav>

            <div className="header-cta">
              <button className="search-btn" title="Search">
                <IoSearchSharp />
              </button>
              <ThemeSwitch />
              <button className="drawer-toggle" onClick={() => setShowDrawer(!showDrawer)}>
                {showDrawer ? <IoMdClose /> : <IoMdMenu />}
              </button>
            </div>
          </div>
        </div>
        <div className="header-btm">
          <div className="container">
            <nav className="header-menu">
              <Link to="/">Home</Link>|
              {categories?.map((i, ind) => (
                <>
                  <Link
                    to={`/category/${i.toLowerCase().replaceAll(" ", "-")}`}
                    key={ind}
                    role="menuitem"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {i}
                  </Link>
                  {ind < categories.length - 1 && " | "}
                </>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <Drawer data={categories} showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
    </>
  );
}
