import "./Auth.css";

//Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

//Hooks
import React, { useEffect, useState } from "react";

//Redux
import { register, reset } from "../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch(); //Função que permite usar as funções do redux

  const { loading, error } = useSelector((state) => state.auth); //Carregando o estado global do redux, através da importação authSlice com o register e reset. Ele lê tudo

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  //Clean all auth states
  useEffect(() => {
    //Dica: Fazer um reset a cada dispatch, para limpar possíveis erros
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subTitle">Cadastre-se para ver as fotos dos seus amigos</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        {error &&
          error
            .filter((err) => err.includes("nome"))
            .map((err) => <Message key={err} msg={err} type="error" />)}
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        {error &&
          error
            .filter((err) => err.includes("email"))
            .map((err) => <Message key={err} msg={err} type="error" />)}
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        {error &&
          error
            .filter((err) => err.includes("senha "))
            .map((err) => <Message key={err} msg={err} type="error" />)}
        <input
          type="password"
          placeholder="Confirma sua senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
        />
        {error &&
          error
            .filter((err) => err.includes("iguais"))
            .map((err) => <Message key={err} msg={err} type="error" />)}
        {!loading && <input type="submit" value="Cadastrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
      </form>
      <p>
        Já possui uma conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
