import "./Auth.css";

//Components
import { Link } from "react-router-dom";
import { Message } from "../../components/Message";

//Hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
    console.log("Login", user);
  };

  //Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

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
        />
        {error &&
          error
            .filter((err) => err.includes("email") || err.includes("encontrado"))
            .map((err) => <Message key={err} msg={err} type="error" />)}
        {/*Tem que colocar a string vazia, ou vai dizer que o input está sendo mudado antes do tempo*/}
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        {error &&
          error
            .filter((err) => err.includes("Senha"))
            .map((err) => <Message key={err} msg={err} type="error" />)}
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;
