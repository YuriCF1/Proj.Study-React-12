const express = require("express");
const path = require("path");
const cors = require("cors");

const port = 5000;

const app = express();

//Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extend: false })); //Define o middleware para processar dados de formulário recebidos nas requisições.

app.listen(port, () => {
  console.log(`App rodando ba porta ${port}`);
});
