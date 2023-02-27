const express = require("express");
const router = express.Router();

//Controller, importando
const { register } = require("../controllers/UserControlles");

//Middlewares
const validate = require("../middlewares/handleValidation");
const { userCreateValidation } = require("../middlewares/usersValidation");

//Routes
router.post("/register", userCreateValidation(), validate, register);

module.exports = router;
