const multer = require("muler"); //Lida com uploads de arquivos
const path = require("path"); //Módulo padrão do node, que trabalha com caminhos padrões. Métodos e diretórios da aplicação

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: (req, res, callback) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }

    callback(null, `uploads/${folder}`);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //Se for um sistema muito grande, pode-ser usar a biblioteca uuid
  },
});

const imageUpload = multer({
  //Validação da imagem e definir onde será salva
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      //upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
