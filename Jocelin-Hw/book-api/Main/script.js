
const express = require("express");
console.log("what is express; ", express)
const app = express();
const port = 3000;

app.get("/", (req, res) => {
 res.send("Hello, World!");
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
   console.log("hello world")
});

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

console.log("I created the perfect system");

const body = document.body;
const fetchBtn = document.getElementById("fetchBtn");
const fetchMultipleBtn = document.getElementById("fetchMultipleBtn");
const searchInput = document.getElementById("searchInput");
const submitFilter = document.getElementById("submitFilter");
const booksContainer = document.getElementById("booksContainer"); // this is your actual container
const loader = document.getElementById("loader");
const mobileToggle = document.getElementById("themeToggleMobile");
const desktopToggle = document.getElementById("themeToggleDesktop");

let books = [];

fetchBtn.addEventListener("click", () => fetchBooks(1));
fetchMultipleBtn.addEventListener("click", () => fetchBooks(5));
searchInput.addEventListener("input", filterBooks);
submitFilter.addEventListener("click", () => {
  console.log("submitFilter");
  filterBooks();
  
});

function fetchBooks(count) {
  loader.style.display = "block";
  const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  axios
    .get(`https://openlibrary.org/search.json?q=${randomLetter}&limit=${count}`)
    .then((response) => {
      loader.style.display = "none";
      books = response.data.docs.slice(0, count); // fix: update global books
      renderList(books);
    })
    .catch((error) => {
      loader.style.display = "none";
      console.error("Error fetching books:", error);
    });
}

function renderList(list) {
  console.log("renderList")
  booksContainer.innerHTML = ""; // fix: use the correct container
  list.forEach((book) => {
    let card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="https://covers.openlibrary.org/b/olid/${
        book.cover_edition_key || "placeholder"
      }-M.jpg" alt="book-cover"/>
      <h3>Title: ${book.title || "Unknown Title"}</h3>
      <p>Author: ${(book.author_name || ["Unknown Author"]).join(", ")}</p>
    `;
    booksContainer.appendChild(card);
  });
}

function filterBooks() {
  const term = searchInput.value.trim().toLowerCase();
  const filterType = document.getElementById("filterSelect").value;
  // Build query based on filter type
  let queryParam = "";
  if (!term || filterType === "none") {
    loader.style.display = "none";
    return;
  } else if (filterType === "name") {
    queryParam = `title=${encodeURIComponent(term)}`;
  } else if (filterType === "author") {
    queryParam = `author=${encodeURIComponent(term)}`;
  }
  loader.style.display = "block";
  axios
    .get(`https://openlibrary.org/search.json?${queryParam}&limit=10`)
    .then((response) => {
      loader.style.display = "none";
      books = response.data.docs;
      renderList(books);
    })
    .catch((error) => {
      loader.style.display = "none";
      console.error("Error fetching filtered books:", error);
    });
}

document.getElementById("signIn").addEventListener("click", () => {
  window.location.href = "../sign-up/";
});

// theme switcher
function setDarkMode(isDark) {
  document.body.classList.toggle("dark", isDark);
  mobileToggle.checked = isDark;
  desktopToggle.checked = isDark;
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Sync both toggles
mobileToggle.addEventListener("change", () => {
  setDarkMode(mobileToggle.checked);
});
desktopToggle.addEventListener("change", () => {
  setDarkMode(desktopToggle.checked);
});

// toggle local storage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  setDarkMode(true);
}