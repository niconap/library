let myLibrary = [];

// Select elements on the page
const lib = document.getElementById("lib");
const ttl = document.getElementById("title");
const ath = document.getElementById("author");
const rd = document.getElementById("read");
const add = document.getElementById("add");

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