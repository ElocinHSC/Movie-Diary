import { deleteMovie, getSavedMovies } from "./storage.js";
import { getMovieGenres } from "./api.js";
import { updateMovie } from "./storage.js";

const diaryContainer = document.querySelector("#diary-container");

async function loadDiaryMovies() {
  const savedMovies = getSavedMovies();
  const genreData = await getMovieGenres();

  savedMovies.forEach((movie) => {
    // 1. Movie Card erstellen
    const diaryCard = document.createElement("div");

    // 2. Poster erstellen
    const diaryPoster = document.createElement("img");
    diaryPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    diaryPoster.alt = movie.title;

    // 3. Titel erstellen
    const diaryTitle = document.createElement("h3");

    diaryTitle.textContent = movie.title;

    // 4. Jahr erstellen
    const diaryYear = document.createElement("span");

    diaryYear.textContent = movie.release_date.slice(0, 4);

    // 5. Rating erstellen
    const diaryRating = document.createElement("span");

    diaryRating.textContent = Math.round(movie.vote_average * 10) / 10;

    // 6. Beschreibung erstellen
    const diaryDescription = document.createElement("p");

    diaryDescription.textContent = movie.overview;

    // 7. Genres umwandeln
    const genreIds = movie.genre_ids;

    const genreNames = genreIds.map((genreId) => {
      const genre = genreData.genres.find((genre) => genre.id === genreId);

      return genre.name;
    });

    const diaryGenres = document.createElement("span");

    genreNames.forEach((genreName) => {
      const diaryGenre = document.createElement("span");

      diaryGenre.textContent = genreName;

      diaryGenres.appendChild(diaryGenre);
    });

    // 8. Remove Button
    const removeButton = document.createElement("button");

    removeButton.textContent = "Remove from Diary";

    removeButton.addEventListener("click", () => {
      deleteMovie(movie.id);
      diaryCard.remove();
    });

    // 9. Notizen
    const noteButton = document.createElement("button");

    noteButton.textContent = "Add Note";

    noteButton.addEventListener("click", () => {
      const noteInput = document.createElement("textarea");
      const saveNote = document.createElement("button");
      const cancelNote = document.createElement("button");
      noteInput.placeholder = "What did you think?";
      noteButton.classList.add("hidden");
      saveNote.textContent = "Save Note";
      cancelNote.textContent = "Cancel";

      diaryCard.appendChild(noteInput);
      diaryCard.appendChild(saveNote);
      diaryCard.appendChild(cancelNote);

      cancelNote.addEventListener("click", () => {
        noteInput.remove();
        saveNote.remove();
        cancelNote.remove();
        noteButton.classList.remove("hidden");
      });

      noteInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          saveNote.click();
        }
      });

      saveNote.addEventListener("click", () => {
        const note = noteInput.value.trim();

        if (note !== "") {
          updateMovie(movie.id, note);
        }

        noteInput.remove();
        saveNote.remove();
        cancelNote.remove();

        const noteText = document.createElement("p");
        noteText.textContent = note;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit Note";

        diaryCard.appendChild(noteText);
        diaryCard.appendChild(editButton);
      });
    });

    // 10. Alles zusammenbauen
    diaryCard.appendChild(diaryPoster);
    diaryCard.appendChild(diaryTitle);
    diaryCard.appendChild(diaryYear);
    diaryCard.appendChild(diaryRating);
    diaryCard.appendChild(diaryGenres);
    diaryCard.appendChild(diaryDescription);
    diaryCard.appendChild(removeButton);
    diaryCard.appendChild(noteButton);

    diaryContainer.appendChild(diaryCard);
  });
}

loadDiaryMovies();
