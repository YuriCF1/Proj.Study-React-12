const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");
// const { check } = require("express-validator"); //??

//Criar funções de foto
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;
  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  //Creating photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  //If photo created sucessfuly, return data
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um problema, por favor, tente novamente mais tarde"],
    });
    return;
  }

  res.status(201).json(newPhoto);
};

//Remove photo from db
const deletePhoto = async (req, res) => {
  const { id } = req.params; //= Id na URL
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id)); //Preciso colocar ela aqui, para aguar a resposta

    //Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada"] });
      return;
    }

    //Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res.status.json({
        errors: ["Ocorreu um erro, por favor, tente novamente mais tarde"],
      });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);

    //O Id eu posso usar para deletar em uma list no front, sem precisar fazer outra requisição par atrazer as fotos atualizadas
    //A mensagem para pode mandar mensagem de feedback para exibir no front
    res
      .status(200)
      .json({ id: photo.id, message: "Foto excluída com sucesso" });
  } catch (errors) {
    res.status(404).json({ errors: "Foto não encontrada" });
  }
};

//Get all photos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]]) //Puxando as fotos mais novas no topo
    .exec(); //Executar

  return res.status(200).json(photos);
};

//Get user photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params; //Pegando id do usuário da url. Se for da requisição, seria as minhas fotos
  const photos = await Photo.find({ userId: id }) //Achando as fotos pelos userId, do perfil do usuário que foi cliado
    .sort([["createdAt", -1]])
    .exec();
  return res.status(200).json(photos);
};

//Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;
  const photo = await Photo.findById(mongoose.Types.ObjectId(id)); //Não é necessário converter o id para ObjectId, pois o Id já foi definido como ObjectId no Schema

  // Check if photos exists
  if (!photo) {
    res.status(404).json({ errros: ["Foto não encontrada"] });
    return;
  }

  res.status(200).json(photo);
};

//Update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let image;

  if (req.file) {
    image = req.file.filename;
  }

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  //Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }

  //Checks if photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    res.status(422).json({
      errors: ["Ocorreu um erro, por favor, tente novamente mais tarde."],
    });
    return;
  }

  // if (!title) {
  //   res
  //     .status(422)
  //     .json({ photo, message: "Title não veio no body", title, id });
  //   return;
  // } else {
  //   photo.title = title;
  // }

  if (title) {
    photo.title = title;
  }

  if (image) {
    photo.image = image;
  }

  await photo.save();

  res.status(200).json({ photo, message: "Foto atualizada com sucesso" });
};

//Like funcionality
const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const photo = await Photo.findById(id);

  //Checks if the photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }

  // Checks if user already liked the photo
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Foto já curtida"], photo });
    return;
  }

  //Put user id in likes array
  photo.likes.push(reqUser._id);
  photo.save();

  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida" });
};

//Comment functionality
const commentingPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id); //Para pegar outros dados do usuário

  const photo = await Photo.findById(id);

  //Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }

  //Putting comments in the array of comments, with useful info about user to frontend
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  photo.comments.push(userComment);

  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "O comentário foi adicionar com sucesso",
  });
};

//Search photo by title
const searchPhotos = async (req, res) => {
  const { q } = req.query; //Query string, não faz parte da URL
  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec(); //Buscando qualquer título que contenha q. "i", ignorando case sensitive

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentingPhoto,
  searchPhotos,
};

//Não há movimentação, apenas na praça, porém não muito
//As rondas não são frequentes, só o perigo
