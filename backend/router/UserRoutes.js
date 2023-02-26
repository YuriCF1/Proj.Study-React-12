const express = require("express");
const router = express.Router();

//Controller, importando
const { register } = require("../controllers/UserControlles");

//Routes
router.post("/register", register);

module.exports = router;
