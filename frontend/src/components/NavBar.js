import "./NavBar.css";
import React from "react";

// Components
import { Link, NavLink } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs"; // bs = indicando que está sendo pego da biblioteca do bootstrap

const NavBar = () => {
  return (
    <div>
      <nav id="nav">
        <Link to="/">ReactGram</Link>
        <form>
          <BsSearch />
          <input type="text" />
        </form>
        <ul id="nav-links">
          <NavLink to="/">
            <BsHouseDoorFill />
          </NavLink>
          <NavLink to="/login">
            Entrar
          </NavLink>
          <NavLink to="/register">
            Cadastrar
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
