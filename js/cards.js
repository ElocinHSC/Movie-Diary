const template = document.querySelector("#movie-card-template");

export function resolveGenreNames(genreIds, genreData) {
  return (genreIds || []).map((genreId) => {
    const genre = genreData.genres.find((g) => g.id === genreId);
    return genre ? genre.name : "Unknown";
  });
}

export function createMovieCard(movie, genreNames) {
  const card = template.content.cloneNode(true).firstElementChild;

  const poster = card.querySelector(".movie-card__poster");
  poster.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "images/placeholder.png";
  poster.alt = movie.title;

  const title = card.querySelector(".movie-card__title");
  title.textContent = movie.title;

  const year = card.querySelector(".movie-card__year");
  year.textContent = movie.release_date ? movie.release_date.slice(0, 4) : "";

  const rating = card.querySelector(".movie-card__rating");
  rating.textContent = `★ ${Math.round(movie.vote_average * 10) / 10}`;

  const description = card.querySelector(".movie-card__description");
  description.textContent = movie.overview;

  const genres = card.querySelector(".movie-card__genres");
  (genreNames || []).forEach((genreName) => {
    const genre = document.createElement("span");
    genre.classList.add("genre-tag");
    genre.textContent = genreName;
    genres.appendChild(genre);
  });

  return card;
}

export function renderMessage(container, text) {
  container.innerHTML = "";
  const message = document.createElement("p");
  message.classList.add("empty-state");
  message.textContent = text;
  container.appendChild(message);
}
