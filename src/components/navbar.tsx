import React from "react";

import "../styles/components/navbar.css";

const Navbar = () => {
  let location = 0;
  if (window.location.href.includes("/categories")) {
    location = 1;
  } else if (window.location.href.includes("/favorites")) {
    location = 2;
  }

  return (
    <>
      <nav className = "nav">
        <div className = "container">
          <div className = "nav-row">
            <a href = "/" className = "logo">
              <strong>Quotes</strong>
            </a>

            <ul className = "nav-list">
              <li className = "nav-list__item">
                <a
                  href = "/"
                  className = {`nav-list__link ${
                    location === 0 ? "nav-list__link--active" : ""
                  }`}
                >
                  Home
                </a>
              </li>

              <li className = "nav-list__item">
                <a
                  href = "/categories"
                  className = {`nav-list__link ${
                    location === 1 ? "nav-list__link--active" : ""
                  }`}
                >
                  Categories
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
