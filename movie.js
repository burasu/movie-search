const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

// Configure app
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use("/", express.static("public"));
app.set("view engine", "pug");

// The Movie DB parameters
const API_KEY = "API-KEY";
let url = "https://api.themoviedb.org/3";
let url_images = "http://image.tmdb.org/t/p/original";

app.get("/", (req, res) => {
  const search = req.query.search;
  let error_code = 0;
  let movies = "";

  if (search != undefined) {
    url = `${url}/search/movie?api_key=${API_KEY}&query=${search}&language=es-ES`;
    request(url, (error, response, body) => {
      movies = JSON.parse(body);
      if (movies.status_code === 7) {
        error_code = movies.status_code;
        console.log("error de api");
        res.send("Error autentificación de api");
      } else {
        console.log(body);
        res.render("index", { movies, error_code });
      }
    });
  } else {
    res.render("index");
  }
});

app.listen(3000, () => {
  console.log("🔥🔥🔥 App listening on port 3000");
});
