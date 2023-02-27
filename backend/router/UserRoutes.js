const express = require("express");
const router = express.Router();

//Controller, importando
const { register, login } = require("../controllers/UserControlles");

//Middlewares
const validate = require("../middlewares/handleValidation");
const { userCreateValidation, loginValidation } = require("../middlewares/usersValidation");

//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);

module.exports = router;
