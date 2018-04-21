const express = require("express");
const bodyParser = require("body-parser");

// Configuración de la app
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use("/", express.static("public"));
app.set("view engine", "pug");

// Configuración de las direrentes rutas
const mainRoutes = require("./routes");
const movieRoutes = require("./routes/movie.js");

app.use(mainRoutes);
app.use("/movie", movieRoutes);

app.use((req, res, next) => {
  console.log("b");
  const err = new Error("Not Found");
  err.status_code = 404;
  next(err);
});

app.use((err, req, res, next) => {
  let error_message;
  let error_stack;
  let error_status_code;

  // API INVALIDA
  if (err.status_code === 7) {
    console.log("c");
    error_message = err.status_message;
    error_stack = "";
    error_status_code = 401;
  } else if (err.status_code === 34) {
    console.log("d");
    error_message = "El recurso que solicitó no se pudo encontrar.";
    error_stack = "";
    error_status_code = 404;
    console.log(err);
  } else if (err.status_code === 404) {
    console.log("e");
    error_message = "El recurso que solicitó no se pudo encontrar.";
    error_stack = "";
    error_status_code = 404;
  } else {
    console.log("f");
    error_message = err.status_message;
    error_stack = "";
    error_status_code = err.status_code;
  }
  console.log("pasa por aqui");
  res.render("error", {
    error_message,
    error_stack,
    error_status_code
  });
});

app.listen(3000, () => {
  console.log("🔥🔥🔥 Corriendo la web en el puerto 3000");
});