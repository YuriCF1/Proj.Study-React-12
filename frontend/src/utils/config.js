// export const api = "http://localhost:5000/api";
// export const uploads = "http://localhost:5000/uploads";
export const api = "https://reactgram-backend-yurifdev.onrender.com/api";
export const uploads = "https://reactgram-backend-yurifdev.onrender.com/uploads"; //reactgram-backend-yurifdev

export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  if (image) {
    //Requisição estilo 'form-data'
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
        "Content-Type": "application/json", //Definindo a resposta como json
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
