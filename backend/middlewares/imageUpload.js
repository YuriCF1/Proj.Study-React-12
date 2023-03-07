const multer = require("multer"); //Lida com uploads de arquivos
const path = require("path"); //Módulo padrão do node, que trabalha com caminhos padrões. Métodos e diretórios da aplicação

// Destination to store image
const imageStorage = multer.diskStorage({
  //Define destiny
  destination: (req, res, callback) => {
    let folder = "";
    
    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }
    
    callback(null, `uploads/${folder}`); //Null na frente das callbacks, quer dizer que nenhum erro foi encontrado
  },
  
  //Define name of the file
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //Se for um sistema muito grande, pode-ser usar a biblioteca uuid. 
    //path.extname(file.originalname) | path = pacote node para lidar com diretório | extname = pegando a extensão do arquivo | file.originalname = pegando o nome original do arquivo
  },
});

const imageUpload = multer({
  //Validação da imagem e definir onde será salva
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { //Fazendo regex para descobrir se no nome tem png ou jpg
      //upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
