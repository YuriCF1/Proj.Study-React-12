const express = require("express");
const router = express.router;

//AbortController

//Middlewares
const { photoInservalidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");

//Routes

module.exports = router;
