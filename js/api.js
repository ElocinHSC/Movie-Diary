import { TMDB_TOKEN } from "./config.js";

export async function getPopularMovies() {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    };

    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options,
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieGenres() {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    };

    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options,
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
