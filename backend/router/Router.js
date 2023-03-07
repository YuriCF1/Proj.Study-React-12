const express = require("express");
const router = express();

//Importing router

//Routes of users
router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRoutes"));

//Routes of photos

// Testing route
router.get("/", (req, res) => {
  res.send("API WORKING");
});

module.exports = router;
