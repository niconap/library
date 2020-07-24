let myLibrary = [];
const lib = document.getElementById("lib");

// Construct book
function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

// Make a new book and render on the page
function addBookToLibrary(title, author, read) {
    myLibrary.push(new Book(title, author, read));
    render(myLibrary);
}

// Append elements to show all books on the page
function render(array) {

}