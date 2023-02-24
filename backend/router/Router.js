const express = require("express");
const router = express();

// Text route
router.get("/", (req, res) => {
  res.send("API WORKING");
});

module.exports = router;
