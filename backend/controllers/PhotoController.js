const Photo = require("../models/Photo");

const mongoose = require("mongoose");

//Criar funções de foto

//Inser a photo, with a user related to it
// const insertPhoto = async (req, res) => {
//   const { title } = req.body;
//   const image = req.file.filename;

//   console.log(req.body);

//   res.send("Photo insert");
// };

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  console.log(req.body);
  res.send("Photo insert");
};
module.exports = { insertPhoto };
