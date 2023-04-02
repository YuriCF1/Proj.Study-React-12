import "./Auth.css";

//Components
import { Link } from "react-router-dom";
import { Message } from "../../components/Message";

//Hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Redux

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDeafault();
  };

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça o login para ver as novidades</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />{" "}
        {/*Tem que colocar a string vazia, ou vai dizer que o input está sendo mudado antes do tempo*/}
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <input type="submit" placeholder="Entrar" />
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;
