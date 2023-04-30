import "./NavBar.css";

// Components
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs"; // bs = indicando que está sendo pego da biblioteca do bootstrap

//Redux
import { logout, reset } from "../slices/authSlice";

//Hooks
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Pesquisado");

    if (query) {
      console.log("Navegando");
      console.log(query);
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div>
      <nav id="nav">
        <Link to="/">ReactGram</Link>
        <form id="search-form" onSubmit={handleSearch}>
          <BsSearch />
          <input
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <ul id="nav-links">
          {auth ? (
            <>
              <li>
                <NavLink to="/">
                  <BsHouseDoorFill />
                </NavLink>
              </li>
              {user && ( //Chegando primeiramente se o ID veio, para nao dar um erro
                <li>
                  <NavLink to={`/users/${user._id}`}>
                    {/*Puxando o usuário do Redux para puxar o id*/}
                    <BsFillCameraFill />
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to={`/profile`}>
                  <BsFillPersonFill />
                </NavLink>
              </li>
              <li>
                <span onClick={handleLogout}>Sair</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Entrar</NavLink>
              </li>
              <li>
                <NavLink to="/register">Cadastrar</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
