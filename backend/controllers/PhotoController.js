const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

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
  const { id } = req.params;
  const reqUser = req.user;
  const photo = Photo.findById(mongoose.Types.ObjectId(id));

  //Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }

  //Check if photo belongs to user
  if (!photo.userId.equals(req.user._id)) {
    res.status.json({
      errors: ["Ocorreu um erro, por favor, tente novamente mais tarde"],
    });
  }
};

module.exports = { insertPhoto };
