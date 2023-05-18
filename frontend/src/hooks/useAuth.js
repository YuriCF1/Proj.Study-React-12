import React, { useEffect, useState } from "react";
//CENTRALIZANDO A LÓGICA PARA EU NÃO TER QUE USAR O REDUX EM TODOS OS COMPONENTES

import { useDispatch, useSelector } from "react-redux"; //Para pegar o dado do redux, da store.js do contexto auth

import { resetError, resetSliceState } from "../slices/photoSlice";

export const useAuth = () => {
  const userLocal = localStorage.getItem("user");
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.photos);
  // const { tokenError } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  //Testamdo se o token foi invalidado pelo prazo dos 7 dias
  useEffect(() => {
    console.log(user);
    console.log('Error: ', error);
    console.log(typeof error);

    let tipoError = typeof error === "object";

    console.log("Type let", tipoError);
    console.log("Typeof: ", !typeof error == "string");
    if (tipoError === true && user && user !== "null") {
      console.log("Auth HOOK TRUE?: ", auth);
      setAuth(true);
    } else {
      console.log("Auth HOOK FALSE?: ", auth);
      setAuth(false); //Até por conta do logout
      dispatch(resetError())
      console.log('Error após reset: ', error);
    }

    setLoading(false);
  }, [user, userLocal]); //Sempre que o usuário for alterado
  return { auth, loading };
};
