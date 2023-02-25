const mongose = require("mongoose");

//Conection
const dbUser = process.env.DB_USER; //Usando o env pois no meio de produção será outro usuário, outra senha
const dbPassoword = process.env.DB_PASSWORD;

const conn = async () => {
  //Conexão com o banco
  try {
    const dbConn = await mongose.connect(
      `mongodb+srv://yurifdev:${dbPassoword}@reactgram.h4e4sul.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Conectado ao banco");
    return dbConn;
  } catch (error) { 
    console.log();
  }
};

conn();

module.exports = conn;
