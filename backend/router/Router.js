const express = require("express");
const router = express();

//Importing router
router.use("/api/users", require("./UserRoutes"));

//Middlewares
const validate = require("../middlewares/handleValidation");

// Text route
router.get("/", (req, res) => {
  res.send("API WORKING");
});

module.exports = router;
