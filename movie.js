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
const API_KEY = "53c4427164154264b13c56b11bd4d755";
let url = "https://api.themoviedb.org/3";
let url_images = "http://image.tmdb.org/t/p/original";

app.get("/", (req, res) => {
  console.log(req.query.search);
  if (req.query.search == undefined) {
    res.send("No hay parametros");
  } else {
    // Get the movie to find and pass it to the URL
    const params = req.query;
    if (params == {}) res.send("no hay parametros");
    else {
      const paramQuery = req.query.search;
      console.log(paramQuery);
      if (paramQuery == "") res.send("no hay nada");
      else {
        res.send("hay algo");
        //console.log(req.query.search);
        //res.render("index");
      }
    }
  }
});

app.post("/search", (req, res) => {
  const paramQuery = req.body.movie;

  url = `${url}/search/movie?api_key=${API_KEY}&query=${paramQuery}&language=es-ES`;
  request(url, (error, response, body) => {
    bodyContent = JSON.parse(body);
    //res.send(bodyContent);
    res.redirect(301, "/list");
  });
});

app.get("/list", (req, res) => {
  console.log(req);
  res.send("hola");
  /*   const movies = bodyContent.results;
  const hola = "hola";
  //res.send(movies);
  res.render("list", { movies }); */
});

app.listen(3000, () => {
  console.log("🔥🔥🔥 App listening on port 3000");
});
