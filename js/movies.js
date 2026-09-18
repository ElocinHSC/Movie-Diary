import { getPopularMovies } from "./api.js";
import { getMovieGenres } from "./api.js";
import { saveMovie } from "./storage.js";

const movieContainer = document.querySelector("#movie-container");

async function loadMovies() {
  const data = await getPopularMovies();
  const genreData = await getMovieGenres();

  data.results.forEach((movie) => {
    // 1. Movie Card erstellen
    const movieCard = document.createElement("div");

    // 2. Poster erstellen
    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    poster.alt = movie.title;

    // 3. Titel erstellen
    const title = document.createElement("h3");

    title.textContent = movie.title;

    // 4. Jahr erstellen
    const year = document.createElement("span");

    year.textContent = movie.release_date.slice(0, 4);

    // 5. Rating erstellen
    const rating = document.createElement("span");

    rating.textContent = Math.round(movie.vote_average * 10) / 10;

    // 6. Beschreibung erstellen
    const description = document.createElement("p");

    description.textContent = movie.overview;

    // 7. Genres umwandeln
    const genreIds = movie.genre_ids;

    const genreNames = genreIds.map((genreId) => {
      const genre = genreData.genres.find((genre) => genre.id === genreId);

      return genre.name;
    });

    const genres = document.createElement("span");

    genreNames.forEach((genreName) => {
      const genre = document.createElement("span");

      genre.textContent = genreName;

      genres.appendChild(genre);
    });

    // 8. Buttons
    const addButton = document.createElement("button");

    addButton.textContent = "Add to Diary";

    addButton.addEventListener("click", () => {
      saveMovie(movie);
    });
    // 8. Alles zusammenbauen
    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(year);
    movieCard.appendChild(rating);
    movieCard.appendChild(genres);
    movieCard.appendChild(description);
    movieCard.appendChild(addButton);
    // 9. Card in movieContainer einsetzen
    movieContainer.appendChild(movieCard);
  });
}

loadMovies();
