import React, { useEffect, useState } from "react";
//CENTRALIZANDO A LÓGICA PARA EU NÃO TER QUE USAR O REDUX EM TODOS OS COMPONENTES

import { useSelector } from "react-redux"; //Para pegar o dado do redux, da store.js do contexto auth

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth);
  const { tokenError } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);
  const [tokenInvalido, setToeknInvalido] = useState(false);
  const [loading, setLoading] = useState(true);

  // console.log('ErrorAuth', errorAuth);
  console.log('ToeknError: ', tokenError);

  if (typeof(tokenError) === 'object') {
    localStorage.removeItem("user");
    setToeknInvalido(true)
  }
 
  //Testamdo se o token foi invalidado pelo prazo dos 7 dias
  useEffect(() => {
    if (user && user !== "null" && tokenInvalido === false) {
      setAuth(true);
      console.log('Auth: ', auth);
    } else {
      setAuth(false); //Até por conta do logout
    }

    setLoading(false);
  }, [user]); //Sempre que o usuário for alterado
  return { auth, loading };
};
