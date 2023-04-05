import { api, requestConfig } from "../utils/config";

//Register an user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    console.log("authService", config);
    console.log("authService", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Logout an user
const logout = () => {
  localStorage.removeItem("user");
};

//Sign in an user
const login = async (data) => {
  //data = user
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    //Só envia se não houver erros
    if (!res.errors) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Update user details
const updateProfile = async (data, token) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const res = await fetch(api + "/users/", config);
    then((res) => res.JSON()).catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
  updateProfile,
};

export default authService;

//NOTAS:
/*Em resumo, a principal diferença entre res.json() e JSON.stringify() é que o primeiro é específico para o Express e fornece recursos adicionais, 
como definir o Content-Type do cabeçalho da resposta e lidar com erros de codificação e detecção de JSON. 
O segundo método é uma funcionalidade padrão do JavaScript para converter objetos em strings JSON, mas não lida com a resposta HTTP em si.*/
