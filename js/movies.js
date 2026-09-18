import { getPopularMovies, getMovieGenres, getSearchMovies } from "./api.js";
import { getSavedMovies, saveMovie, deleteMovie } from "./storage.js";
import { createMovieCard, resolveGenreNames, renderMessage } from "./cards.js";

const movieContainer = document.querySelector("#movie-container");
const searchInput = document.querySelector("#search");
const searchForm = document.querySelector("#search-form");
let genreData;

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchMovies();
});

searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() === "") {
    loadMovies();
  }
});

async function init() {
  try {
    genreData = await getMovieGenres();
    await loadMovies();
  } catch (error) {
    renderMessage(
      movieContainer,
      "Could not load movies. Please try again later.",
    );
  }
}

init();

async function loadMovies() {
  try {
    const data = await getPopularMovies();

    renderMovies(data.results, genreData);
  } catch (error) {
    renderMessage(
      movieContainer,
      "Could not load movies. Please try again later.",
    );
  }
}

async function searchMovies() {
  const query = searchInput.value.trim();
  if (!query) {
    loadMovies();
    return;
  }

  renderMessage(movieContainer, "Searching...");
  try {
    const searchData = await getSearchMovies(query);
    renderMovies(searchData.results, genreData, query);
  } catch (error) {
    renderMessage(
      movieContainer,
      "Could not load movies. Please try again later.",
    );
  }
}

function renderMovies(movies, genres, query) {
  if (movies.length === 0) {
    movieContainer.innerHTML = "";
    const message = document.createElement("p");
    message.textContent = `No movies found for "${query}".`;
    movieContainer.appendChild(message);
    return;
  }

  movieContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const saveIds = getSavedMovies().map((saveMovie) => saveMovie.id);

  movies.forEach((movie) => {
    const genreNames = resolveGenreNames(movie.genre_ids, genres);
    const movieCard = createMovieCard(movie, genreNames);

    const addButton = document.createElement("button");
    setAddButtonState(addButton, movie, genreNames, saveIds.includes(movie.id));

    movieCard.appendChild(addButton);
    fragment.appendChild(movieCard);
  });

  movieContainer.appendChild(fragment);
}

function setAddButtonState(button, movie, genreNames, initiallySaved) {
  let isSaved = initiallySaved;
  button.textContent = isSaved ? "Remove from Diary" : "Add to Diary";

  button.addEventListener("click", () => {
    if (isSaved) {
      deleteMovie(movie.id);
      isSaved = false;
    } else {
      saveMovie(movie, genreNames);
      isSaved = true;
    }
    button.textContent = isSaved ? "Remove from Diary" : "Add to Diary";
  });
}
