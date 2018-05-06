![alt text][logo]
[logo]: https://raw.githubusercontent.com/burasu/movie-search/master/public/assets/images/logo.png "Movie Search"

**Movie Search** no es una web comercial. Es una webapp desarrollada para ampliar los conocimientos del desarrollador.

Todo el código del proyecto está bajo licencia **MIT**.

**Movie Search** está desarrollada integramente en [NodeJS](https://nodejs.org). La información de las películas y series de televisión se realiza a través del uso de la **API** de [TheMovieDB](http://themoviedb.org/).

El tema de la página es de [Gnodesign](https://themeforest.net/item/movify-movies-tv-shows-cinema-html-template/21561137).

## Instalación

Es muy sencillo instalar Movie Search y todas las bibliotecas relacionadas.

```bash
# instalar movie-search en el equipo en cuestión
npm install
```

Simplemente con ese comando dentro de la carpeta de **Movie Search** ya se isntalarán todos los archivos necesarios.

## Modo de uso

Para hacer uso de **Movie Search** simplemente hace falta tener una *clave API* facilitada por **TheMovieDB**. Una vez con dicha **API** has de abrir el fichero `themoviedb.js` y reemplazar el texto *YOUR_API_KEY* por el suyo correcto.

```js
const themoviedb = {
  API_KEY: "YOUR_API_KEY",
  url: "https://api.themoviedb.org/3",
  url_images_original: "http://image.tmdb.org/t/p/original",
  url_images_w500: "http://image.tmdb.org/t/p/w500"
};
```