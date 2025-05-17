console.log("I created the perfect system");

const fetchBtn = document.getElementById("fetchBtn");
const fetchMultipleBtn = document.getElementById("fetchMultipleBtn");
const searchInput = document.getElementById("searchInput");
const submitFilter = document.getElementById("submitFilter");
const booksContainer = document.getElementById("booksContainer"); // this is your actual container
const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");

let books = [];


fetchBtn.addEventListener("click", () => fetchBooks(1));
fetchMultipleBtn.addEventListener("click", () => fetchBooks(5));
searchInput.addEventListener("input", filterBooks);
themeToggle.addEventListener("change", toggleTheme);
submitFilter.addEventListener("click", () => {
  const term = searchInput.value.trim().toLowerCase();
  const filterType = document.getElementById("filterSelect").value;
  if (!term || filterType === "none") return;
  loader.style.display = "block";
  // Build query based on filter type
  let queryParam = "";
  if (filterType === "name") {
    queryParam = `title=${encodeURIComponent(term)}`;
  } else if (filterType === "author") {
    queryParam = `author=${encodeURIComponent(term)}`;
  }
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
  const term = searchInput.value.toLowerCase();
  const filterType = document.getElementById("filterSelect").value;
  const filtered = books.filter((book) => {
    if (filterType === "title") {
      return (book.title || "").toLowerCase().includes(term);
    } else if (filterType === "author") {
      const authorName = (book.author_name || []).join(" ").toLowerCase();
      return authorName.includes(term);
    }
    return true; // if "none" is selected, show all <-(doesn't work)
  });
  console.log("filter being called", filterBooks);
  renderList(filtered);
}

function toggleTheme() {
  document.body.classList.toggle("dark", themeToggle.checked);
}
