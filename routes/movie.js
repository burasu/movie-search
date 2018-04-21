const express = require("express");
const router = express.Router();
const request = require("request");
const querystring = require("querystring");
let themoviedb = require("../themoviedb.js");

router.get("/", (req, res) => {
  res.redirect(301, "/");
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const url = `${themoviedb.url}/movie/${id}?api_key=${
    themoviedb.API_KEY
  }&language=es-ES`;

  request(url, (error, response, body) => {
    if (body) {
      const data = JSON.parse(body);

      if (data.status_code === 34 || data.status_code === 7) {
        console.log("a");
        console.log(data);
        next(data);
      } else {
        res.render("movie", {
          movie: data,
          url_images_w500: themoviedb.url_images_w500
        });
      }
    } else {
      error.status_code = 500;
      error.status_message = "Internal Server Error";
      next(error);
    }
  });
});

module.exports = router;
