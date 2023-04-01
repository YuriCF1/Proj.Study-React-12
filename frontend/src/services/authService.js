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

const authService = {
  register,
  logout,
};

export default authService;
