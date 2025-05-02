console.log("I created the perfect system");
function fetchBooks() {
    axios.get("https://openlibrary.org/search.json?q=key,title,authorname,editions")
    // Use to fetch covers for books and authors => https://covers.openlibrary.org/a/olid/OL23919A-M.jpg
    // ??
}