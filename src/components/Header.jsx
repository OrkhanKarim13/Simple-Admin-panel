import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo_dark.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header_container">
        <div className="logo">
          <NavLink to={"/"}>
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <nav className="navBar">
          <ul className="navList">
            <li className="navItem">
              <NavLink to={"/addproduct"}>ADD PRODUCT</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
