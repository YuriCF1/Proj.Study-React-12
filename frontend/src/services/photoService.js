import { api, requestConfig } from "../utils/config";

//Publish an user photo
const publishPhoto = async (data, token) => {
  //Token pois é uma função apenas para quem está logado/autentificado
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/photos", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get user photos
const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/photos/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Delete photo
const deletePhoto = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Update a photo
const updatePhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get a photo by id
const getPhotoById = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Like a photo
const likeAPhoto = async (id, token) => {
  const config = requestConfig("PUT", null, token);

  try {
    const res = await fetch(api + "/photos/like/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Disliking a photo
const dislikeAPhoto = async (id, token) => {
  const config = requestConfig("DELETE", null, token);
  try {
    const res = await fetch(api + "/photos/dislike/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    console.log("res:", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Add a Coment to a photo
const comentAPhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/photos/coment/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get all photos
const getAllPhotos = async (token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/photos/", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Search photo by titles
const searchPhotos = async (query, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/photos/search?q=" + query, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {}
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  requestConfig,
  deletePhoto,
  updatePhoto,
  getPhotoById,
  likeAPhoto,
  comentAPhoto,
  getAllPhotos,
  searchPhotos,
  dislikeAPhoto,
};

export default photoService;
