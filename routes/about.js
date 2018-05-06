const express = require("express");
const router = express.Router();
const request = require("request");
const querystring = require("querystring");

router.get("/", (req, res) => {
  res.render("about");
});

module.exports = router;