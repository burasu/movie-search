const express = require("express");
const router = express.Router();
const request = require("request");
const querystring = require("querystring");
let themoviedb = require("../themoviedb.js");

router.get("/", (req, res) => {
  res.render('index');
});

router.get("/movies", (req, res, next) => {
  const search = req.query.search;
  let total_results = 0;

  if (search != undefined) {
    let search_query = querystring.escape(search);
    const url = `${themoviedb.url}/search/movie?api_key=${
      themoviedb.API_KEY
    }&query=${search_query}&language=es-ES`;

    request(url, (error, response, body) => {
      if (body) {
        const data = JSON.parse(body);

        if (data.status_code === 7) {
          next(data);
        } else {
          total_results = data.total_results;
          res.render("movies", {
            movies: data,
            total_results,
            url_images_w500: themoviedb.url_images_w500
          });
        }
      } else {
        error.status_code = 500;
        error.status_message = "Internal Server Error";
        next(error);
      }
    });
  } else {
    res.render("index");
  }
});

module.exports = router;