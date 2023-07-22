require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

//Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extend: false })); //Define o middleware para processar dados de formulário recebidos nas requisições.

const allowedOrigins = [
  'http://localhost:3000',
  'https://reactgram-frontend-yurifdev.onrender.com'
];


//Solving cors || Executando requisições pelo mesmo domínio
app.use(cors({ credentials: true, origin: allowedOrigins })); //crediantals: true = o servidor pode enviar e receber cookies e cabeçalhos de autenticação.

//Upload directory
//Setting upload route
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); //static = pasta terá arquivos estáticos|| Qualquer arquivo que esteja dentro da pasta /uploads poderá ser acessado publicamente no endereço http://localhost:3000/uploads/<nome-do-arquivo>.
//__dirname = diretório local, e dentro deles, a pasta 'uploads'

// DB conection
require("./config/db.js");

// Routes, qualquer arquivo que esteja dentro da pasta /uploads poderá ser acessado publicamente no endereço http://localhost:3000/uploads/<nome-do-arquivo>.
const router = require("./router/Router.js");
app.use(router);

app.listen(port, () => {
  console.log(`App rodando ba porta ${port}`);
});
