import { api, requestConfig } from "../utils/config";

//Get user details
const profile = async (data, token) => { //Dá pra pegar o user pelo token
  const config = requestConfig("GET", data, token);

  try {
    const res = fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
};

export default userService;
