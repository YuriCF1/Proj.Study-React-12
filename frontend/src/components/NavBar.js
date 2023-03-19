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
        <form id="search-form">
          <BsSearch />
          <input type="text" placeholder="Pesquisar" />
        </form>
        <ul id="nav-links">
          <li>
            <NavLink to="/">
              <BsHouseDoorFill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">Entrar</NavLink>
          </li>
          <li>
            <NavLink to="/register">Cadastrar</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
