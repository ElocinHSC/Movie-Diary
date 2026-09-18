import { getPopularMovies, getMovieGenres } from "./api.js";
import { saveMovie } from "./storage.js";
import { createMovieCard, resolveGenreNames } from "./cards.js";

const movieContainer = document.querySelector("#movie-container");

async function loadMovies() {
  try {
    const data = await getPopularMovies();
    const genreData = await getMovieGenres();

    if (!data || !genreData) return;

    const fragment = document.createDocumentFragment();

    data.results.forEach((movie) => {
      const genreNames = resolveGenreNames(movie.genre_ids, genreData);
      const movieCard = createMovieCard(movie, genreNames);

      const addButton = document.createElement("button");
      addButton.textContent = "Add to Diary";
      addButton.addEventListener("click", () => {
        saveMovie(movie, genreNames);
      });

      movieCard.appendChild(addButton);
      fragment.appendChild(movieCard);
    });

    movieContainer.appendChild(fragment);
  } catch (error) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Could not load movies. Please try again later.";

    movieContainer.appendChild(errorMessage);
  }
}

loadMovies();
