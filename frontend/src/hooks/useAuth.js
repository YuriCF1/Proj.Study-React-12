import React, { useEffect, useState } from "react";
//CENTRALIZANDO A LÓGICA PARA EU NÃO TER QUE USAR O REDUX EM TODOS OS COMPONENTES

import { useSelector } from "react-redux"; //Para pegar o dado do redux, da store.js do contexto auth

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user != "null") {
      setAuth(true);
    } else {
      setAuth(false); //Até por conta do logout
    }

    setLoading(false);
  }, [user]); //Sempre que o usuário for alterado
  return { auth, loading };
};
