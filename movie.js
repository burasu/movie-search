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
const API_KEY = "API_KEY";
let url = "https://api.themoviedb.org/3";
let url_images = "http://image.tmdb.org/t/p/original";

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res) => {
  res.redirect(301, "/");
});

app.post("/search", (req, res) => {
  // Get the movie to find and pass it to the URL
  const paramQuery = req.body.movie;
  url = `${url}/search/movie?api_key=${API_KEY}&query=${paramQuery}&language=es-ES`;

  request(url, (error, response, body) => {
    bodyContent = JSON.parse(body);
    //res.send(bodyContent);
    res.redirect(301, "/list");
  });
});

app.get("/list", (req, res) => {
  const movies = bodyContent.results;
  const hola = "hola";
  //res.send(movies);
  res.render("list", { movies });
});

app.listen(3000, () => {
  console.log("🔥🔥🔥 App listening on port 3000");
});
