export function saveMovie(movie, genreNames) {
  const savedMovies = getSavedMovies();

  if (!savedMovies.some((savedMovie) => savedMovie.id === movie.id)) {
    savedMovies.push({ ...movie, genres: genreNames });
  }

  localStorage.setItem("movies", JSON.stringify(savedMovies));
}

export function getSavedMovies() {
  return JSON.parse(localStorage.getItem("movies")) || [];
}

export function deleteMovie(movieId) {
  const savedMovies = getSavedMovies();

  const updatedMovies = savedMovies.filter(
    (savedMovie) => savedMovie.id !== movieId,
  );

  localStorage.setItem("movies", JSON.stringify(updatedMovies));
}

export function updateMovie(movieId, note) {
  const savedMovies = getSavedMovies();

  const updatedMovies = savedMovies.map((savedMovie) => {
    if (savedMovie.id === movieId) {
      savedMovie.note = note;
    }
    return savedMovie;
  });

  localStorage.setItem("movies", JSON.stringify(updatedMovies));
}
