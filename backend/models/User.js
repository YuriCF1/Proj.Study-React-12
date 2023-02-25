//Models são conlection em uma modelo MVC de código. Pois o mangose é orientado com models
//Traduzindo as tabelas em código, se comparado com o Firebase
const mongoose = require("mongoose");
const { Schema } = mongoose; //Esquema, como ele é construído. para depois colocar tal esquema em um module, pois ele possui os métodos, excluir, ler, editar

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
  },
  {
    temestamps: true, //Criando dois campos de tempo, created At | updated At
  }
);

const User = mongoose.mongoose.model("User", userSchema); //Definindo o model, com o nome User, e pssando um Schema

module.exports = User; 
