export const api = "http://localhosts:5000/api";
export const upload = "http://localhost:5000/uploads";

export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    //Se o data não existir, pode ser um like por exem plo
    config = {
      method,
      headers: {},
    };
  } else {
    //Quando vem qualquer tipo de dados. Como de cadastro
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "aplication/json", //Definindo a resposta como json
      },
    };
  }

  if (token) {
    config.headers.Autorization = `Bearer ${token}`;
  }

  return config;
};
