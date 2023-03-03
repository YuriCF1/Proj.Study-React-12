const express = require("express");
const router = express.Router();

//Controller, importando
const {
  register,
  login,
  getCurrentUser,
  update,
} = require("../controllers/UserControlles");

//Middlewares
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/usersValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
); //put = verbo de atualização
//Salvando na coleção 'profileImage na requisição, que envia o nome do arquivo
//O método single() do multer é responsável por definir o nome do campo que será utilizado para fazer o upload do arquivo.

module.exports = router;
