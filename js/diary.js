import { deleteMovie, getSavedMovies, updateMovie } from "./storage.js";
import { createMovieCard, renderMessage } from "./cards.js";

const diaryContainer = document.querySelector("#diary-container");

function loadDiaryMovies() {
  const savedMovies = getSavedMovies();

  if (savedMovies.length === 0) {
    renderMessage(
      diaryContainer,
      "No movies saved yet. Go add some from Discover!",
    );
    return;
  }

  const fragment = document.createDocumentFragment();

  savedMovies.forEach((movie) => {
    const diaryCard = createMovieCard(movie, movie.genres);

    const removeButton = document.createElement("button");
    removeButton.classList.add("btn-danger", "mt-2");
    removeButton.textContent = "Remove from Diary";
    removeButton.addEventListener("click", () => {
      deleteMovie(movie.id);
      diaryCard.remove();

      if (diaryContainer.children.length === 0) {
        renderMessage(
          diaryContainer,
          "No movies saved yet. Go add some from Discover!",
        );
      }
    });

    const noteContainer = document.createElement("div");
    noteContainer.classList.add("space-y-3");
    renderNote(movie, noteContainer);

    const actions = diaryCard.querySelector(".movie-card__actions");

    actions.appendChild(noteContainer);
    actions.appendChild(removeButton);
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
  noteInput.classList.add("note-textarea");
  saveNote.classList.add("btn-primary", "flex-1", "w-auto");
  cancelNote.classList.add("btn-note", "flex-1", "w-auto");

  noteInput.value = movie.note || "";
  noteInput.placeholder = "What did you think?";

  saveNote.textContent = "Save Note";
  cancelNote.textContent = "Cancel";

  const noteActions = document.createElement("div");
  noteActions.classList.add("flex", "gap-2");

  noteActions.appendChild(saveNote);
  noteActions.appendChild(cancelNote);

  noteContainer.appendChild(noteInput);
  noteContainer.appendChild(noteActions);

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
    noteButton.classList.add("btn-note");
    noteButton.textContent = "Add Note";

    noteButton.addEventListener("click", () => {
      openNoteEditor(movie, noteContainer);
    });

    noteContainer.appendChild(noteButton);
  } else {
    const noteText = document.createElement("p");
    noteText.classList.add(
      "text-small",
      "text-text-secondary",
      "italic",
      "bg-surface-sunken",
      "rounded-control",
      "p-3",
    );
    noteText.textContent = movie.note;

    const editButton = document.createElement("button");
    editButton.classList.add("btn-note");
    editButton.textContent = "Edit Note";

    editButton.addEventListener("click", () => {
      openNoteEditor(movie, noteContainer);
    });

    noteContainer.appendChild(noteText);
    noteContainer.appendChild(editButton);
  }
}
