const express = require("express");
const router = express.Router();
const request = require("request");
const querystring = require("querystring");
const moment = require('moment');
let themoviedb = require("../themoviedb.js");

router.get("/", (req, res) => {
  res.redirect(301, "/");
});

router.get("/:id", (req, res, next) => {
  const {
    id
  } = req.params;
  const url = `${themoviedb.url}/movie/${id}?api_key=${themoviedb.API_KEY}&language=es-ES`;
  //const url_release = `${themoviedb.url}/movie/${id}/release_dates?api_key=${themoviedb.API_KEY}`;

  request(url, (error, response, body) => {
    if (body) {
      const data = JSON.parse(body);

      if (data.status_code === 34 || data.status_code === 7) {
        next(data);
        return;
      } else {
        // Obtenemos la fecha del estreno y la formateamos
        let release_date = moment(data.release_date).format("LL");

        // Obtenemos la duración de la película y la formateamos a horas y minutos
        let hours = Math.floor(data.runtime / 60);
        let minutes = data.runtime % 60;
        let runtime = hours + "h " + minutes + "min"

        // Obtenemos los generos de la película
        let genres = "";
        for (var i = 0, len = data.genres.length; i < len; i++) {
          genres += data.genres[i].name + ", ";
        }
        genres = genres.substr(0, genres.length - 2);

        res.render("movie", {
          movie: data,
          release_date: release_date,
          runtime: runtime,
          genres: genres,
          url_images_w500: themoviedb.url_images_w500,
          url_images_original: themoviedb.url_images_original
        });
      }
    } else {
      error.status_code = 500;
      error.status_message = "Internal Server Error";
      next(error);
      return;
    }
  });
});

module.exports = router;