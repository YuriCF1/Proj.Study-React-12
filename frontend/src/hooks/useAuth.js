import React, { useEffect, useState } from "react";
//CENTRALIZANDO A LÓGICA PARA EU NÃO TER QUE USAR O REDUX EM TODOS OS COMPONENTES

import { useSelector } from "react-redux"; //Para pegar o dado do redux, da store.js do contexto auth

export const useAuth = () => {
  const userLocal = localStorage.getItem("user");
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.photos);
  const { tokenError } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);
  const [tokenInvalido, setToeknInvalido] = useState(false);
  const [loading, setLoading] = useState(true);

  // console.log('ErrorAuth', errorAuth);
  // console.log('ToeknError: ', tokenError);

  // if (typeof(tokenError) === 'object') {
  //   localStorage.removeItem("user");
  //   setToeknInvalido(true)
  // }
 
  // console.log('user authhook: ',user);

  //Testamdo se o token foi invalidado pelo prazo dos 7 dias
  useEffect(() => {
    // console.log(userLocal);
    // console.log(typeof(userLocal));
    // console.log(userLocal !== null);
    console.log(user);
    console.log(error);
    console.log(typeof(error));
    console.log('Typeof: ', !typeof(error) == "string");
    // if (typeof(error) !== "string" && user && user !== "null") {
    if (user && user !== "null") {
      console.log('Auth HOOK TRUE?: ', auth);
      setAuth(true);
    } else {
      console.log('Auth HOOK FALSE?: ', auth);
      setAuth(false); //Até por conta do logout
    }

    setLoading(false);
  }, [user, userLocal]); //Sempre que o usuário for alterado
  return { auth, loading };
};
