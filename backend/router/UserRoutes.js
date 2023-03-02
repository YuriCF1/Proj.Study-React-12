const express = require("express");
const router = express.Router();

//Controller, importando
const { register, login, getCurrentUser } = require("../controllers/UserControlles");

//Middlewares
const validate = require("../middlewares/handleValidation");
const { userCreateValidation, loginValidation } = require("../middlewares/usersValidation");
const authGuard = require("../middlewares/authGuard")

//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser)
module.exports = router;
