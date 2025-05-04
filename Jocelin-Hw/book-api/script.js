console.log("I created the perfect system");

const fetchBtn = document.getElementById("fetchBtn");
const fetchMultipleBtn = document.getElementById("fetchMultipleBtn");
const searchInput = document.getElementById("searchInput");
const booksContainer = document.getElementById("booksContainer");
const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");

let books = [];
let bookImg =  

fetchBtn.addEventListener("click", () => fetchBooks(1));
fetchMultipleBtn.addEventListener("click", () => fetchBooks(5));
searchInput.addEventListener("input", filterBooks);
themeToggle.addEventListener("change", toggleTheme);

// fix fetchBook function for random book each press

function fetchBooks(count) {
    loader.style.display = "block";
    const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    axios
      .get(`https://openlibrary.org/search.json?q=${randomLetter}&limit=${count}`)
      .then((response) => {
        loader.style.display = "none";
        const books = response.data.docs.slice(0, count); // get first `count` books
        renderList(books);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
}

function renderList(list) {
  console.log("renderList is being called");
  booksContainer.innerHTML = "";
  list.forEach((book) => {
    let card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
        <img src="https://covers.openlibrary.org/b/olid/${book.cover_edition_key || "placeholder"}-M.jpg" alt="book-cover"/>
        <h3>Title: ${book.title || "Unknown Title"}</h3>
        <p>Author: ${book.author_name || "Unknown Author"}</p>
        `;
    booksContainer.appendChild(card);
  });
}

function filterBooks() {
  let term = searchInput.value.toLowerCase();
  let filtered = books.filter((book) => {
    let authorName = `${book.author_name}`.toLowerCase();
    return authorName.includes(term);
  });
  console.log("Filter Being Called");
  renderList(filtered);
}

function toggleTheme() {
  document.body.classList.toggle("dark", themeToggle.checked);
  console.log("This is toggleTheme being called");
}
