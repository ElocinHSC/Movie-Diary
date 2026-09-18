import { deleteMovie, getSavedMovies, updateMovie } from "./storage.js";
import { createMovieCard } from "./cards.js";

const diaryContainer = document.querySelector("#diary-container");

function loadDiaryMovies() {
  const savedMovies = getSavedMovies();
  const fragment = document.createDocumentFragment();

  savedMovies.forEach((movie) => {
    const diaryCard = createMovieCard(movie, movie.genres);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove from Diary";
    removeButton.addEventListener("click", () => {
      deleteMovie(movie.id);
      diaryCard.remove();
    });

    const noteContainer = document.createElement("div");
    renderNote(movie, noteContainer);

    diaryCard.appendChild(removeButton);
    diaryCard.appendChild(noteContainer);
    fragment.appendChild(diaryCard);
  });
  diaryContainer.appendChild(fragment);
}

loadDiaryMovies();

function openNoteEditor(movie, noteContainer) {
  noteContainer.innerHTML = "";

  const noteInput = document.createElement("textarea");
  const saveNote = document.createElement("button");
  const cancelNote = document.createElement("button");

  noteInput.value = movie.note || "";
  noteInput.placeholder = "What did you think?";

  saveNote.textContent = "Save Note";
  cancelNote.textContent = "Cancel";

  noteContainer.appendChild(noteInput);
  noteContainer.appendChild(saveNote);
  noteContainer.appendChild(cancelNote);

  noteInput.focus();

  cancelNote.addEventListener("click", () => {
    renderNote(movie, noteContainer);
  });

  noteInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      saveNote.click();
    }
  });

  saveNote.addEventListener("click", () => {
    const note = noteInput.value.trim();

    if (note === "" && !movie.note) {
      return;
    }

    updateMovie(movie.id, note);
    movie.note = note;

    renderNote(movie, noteContainer);
  });
}

function renderNote(movie, noteContainer) {
  noteContainer.innerHTML = "";

  if (!movie.note) {
    const noteButton = document.createElement("button");
    noteButton.textContent = "Add Note";

    noteButton.addEventListener("click", () => {
      openNoteEditor(movie, noteContainer);
    });

    noteContainer.appendChild(noteButton);
  } else {
    const noteText = document.createElement("p");
    noteText.textContent = movie.note;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit Note";

    editButton.addEventListener("click", () => {
      openNoteEditor(movie, noteContainer);
    });

    noteContainer.appendChild(noteText);
    noteContainer.appendChild(editButton);
  }
}
