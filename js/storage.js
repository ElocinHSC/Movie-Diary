export function saveMovie(movie) {
  const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];

  if (!savedMovies.some((savedMovie) => savedMovie.id === movie.id)) {
    savedMovies.push(movie);
  }

  localStorage.setItem("movies", JSON.stringify(savedMovies));
}

export function getSavedMovies() {
  const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];

  return savedMovies;
}

export function deleteMovie(movieId) {
  const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];

  const updatedMovies = savedMovies.filter(
    (savedMovie) => savedMovie.id !== movieId,
  );

  localStorage.setItem("movies", JSON.stringify(updatedMovies));
}

export function updateMovie(movieId, note) {
  const savedMovies = JSON.parse(localStorage.getItem("movies"));

  const updatedMovies = savedMovies.map((savedMovie) => {
    if (savedMovie.id === movieId) {
      savedMovie.note = note;
    }

    return savedMovie;
  });

  localStorage.setItem("movies", JSON.stringify(updatedMovies));
}
