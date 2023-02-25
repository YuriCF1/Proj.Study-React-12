const mongoose = require("mangoose");
const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId, //Criando o userId do mangoose
    userName: String,
  },
  {
    timeStamps: true,
  }
);

const Photo = mangoose.module("Photo", photoSchema);

module.exports = Photo;
