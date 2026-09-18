export function resolveGenreNames(genreIds, genreData) {
  return (genreIds || []).map((genreId) => {
    const genre = genreData.genres.find((g) => g.id === genreId);
    return genre ? genre.name : "Unknown";
  });
}

export function createMovieCard(movie, genreNames) {
  // 1. Card erstellen
  const card = document.createElement("article");
  card.classList.add("movie-card");

  // 2. Poster erstellen
  const poster = document.createElement("img");
  if (movie.poster_path) {
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  } else {
    //poster.src = "placeholder"
  }
  poster.alt = movie.title;

  // 3. Titel erstellen
  const title = document.createElement("h3");
  title.textContent = movie.title;

  // 4. Jahr erstellen
  const year = document.createElement("span");
  year.textContent = movie.release_date ? movie.release_date.slice(0, 4) : "";

  // 5. Rating erstellen
  const rating = document.createElement("span");
  rating.textContent = Math.round(movie.vote_average * 10) / 10;

  // 6. Beschreibung erstellen
  const description = document.createElement("p");
  description.textContent = movie.overview;

  // 7. Genres anhängen
  const genres = document.createElement("span");
  genres.classList.add("movie-card__genres");
  genreNames.forEach((genreName) => {
    const genre = document.createElement("span");
    genre.textContent = genreName;
    genres.appendChild(genre);
  });

  // 8. Gemeinsame Teile zusammenbauen
  card.appendChild(poster);
  card.appendChild(title);
  card.appendChild(year);
  card.appendChild(rating);
  card.appendChild(genres);
  card.appendChild(description);

  // Der Aufrufer (movies.js / diary.js) hängt danach noch
  // seinen eigenen Action-Bereich an (Add-Button bzw. Remove+Notizen)
  return card;
}
