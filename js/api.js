import { TMDB_TOKEN } from "./config.js";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};
export async function getPopularMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMovieGenres() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie genres");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSearchMovies(query) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
      options,
    );
    if (!response.ok) {
      throw new Error("Failed to search movies");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
