import { css } from "@emotion/css";
import React from "react";
import { NavLink } from "react-router-dom";

const NavStyles = css`
  margin-bottom: 15px;
  a {
    color: #fff;
    padding: 6px 12px;
    text-decoration: none;
    border-radius: 4px;

    &.active {
      color: #50fa7b;
      border: 2px solid #50fa7b;
    }
  }
`;

const Nav = () => (
  <nav className={NavStyles}>
    <NavLink
      to="/"
      className={({ isActive }) => (isActive ? "active" : "inactive")}
      style={({ isActive }) =>
        isActive ? { fontStyle: "italic", fontWeight: 900 } : null
      }
    >
      Products
    </NavLink>
    <NavLink
      to="/admin"
      className={({ isActive }) => (isActive ? "active" : "inactive")}
      style={({ isActive }) =>
        isActive ? { fontStyle: "italic", fontWeight: 900 } : null
      }
    >
      Admin
    </NavLink>
  </nav>
);

export default Nav;
