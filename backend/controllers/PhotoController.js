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

    //O Id eu posso usar para deletar em uma list ano front, sem precisar fazer outra requisição par atrazer as fotos atualizadas
    //A mensagem para pode mandar mensagem de feedback para exibir no front
    res
      .status(200)
      .json({ id: photo.id, message: "Foto excluída com sucesso" });

  } catch (errors) {
    res.status(404).json({errors: "Foto não encontrada" });
  }
};

module.exports = { insertPhoto, deletePhoto };
