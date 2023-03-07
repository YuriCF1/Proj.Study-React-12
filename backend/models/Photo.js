const mongoose = require("mongoose");
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

//O primeiro parâmetro é o nome da coleção, que será usado para criar a coleção no banco de dados, com o primeiro caractere em minúsculo e em plural 
//(no caso, "Photo" seria transformado em "photos"). 
//O segundo parâmetro é o schema que será usado para validar e definir a estrutura dos documentos que serão armazenados na coleção.
const Photo = mongoose.mongoose.model("Photo", photoSchema);

module.exports = Photo;

//Com esse modelo, podemos usar os métodos disponíveis no Mongoose para interagir com os documentos da coleção, como criar, atualizar, remover e buscar. 
//Além disso, podemos utilizar o modelo para criar instâncias de fotos no banco de dados e fazer as operações necessárias em cada instância, como salvar ou atualizar informações.
