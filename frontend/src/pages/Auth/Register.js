import "./Auth.css";

//Components
import { Link } from "react-router-dom";

//Hooks
import React, { useEffect, useState } from "react";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviado");
  };

  return (
    <div>
      <h2>ReactGram</h2>
      <p className="subTitle">Cadastre-se para ver as fotos dos seus amigos</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirma sua senha" />
        <input type="sbubmit" value="Cadastrar" />
      </form>
      <p>Já possui uma conta? <Link to="/login">Clique aqui</Link></p>
    </div>
  );
};

export default Register;
