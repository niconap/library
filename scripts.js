let myLibrary = [];

// Select elements on the page
const lib = document.getElementById("lib");
const ttl = document.getElementById("title");
const ath = document.getElementById("author");
const rd = document.getElementById("read");
const add = document.getElementById("add");

// Add eventlistener to the button
add.addEventListener("click", addBookToLibrary);

// Construct book
function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

// Make a new book and render on the page
function addBookToLibrary() {
    myLibrary.push(new Book(ttl.value, ath.value, rd.checked));
    if (ttl.value == "" || ath.value == "") {
        alert("Please enter a title and an author!");
    } else {
        ttl.value = "";
        ath.value = "";
        rd.checked = false;
        render(myLibrary);
    }
}

// Append elements to show all books on the page
function render(array) {
    lib.innerHTML = "";
    array.forEach(book => {
        let tableRow = lib.insertRow();
        tableRow.insertCell(0).innerHTML = book.title;
        tableRow.insertCell(1).innerHTML = book.author;
        if (book.read == true) {
            tableRow.insertCell(2).innerHTML = "Read";
        } else {
            tableRow.insertCell(2).innerHTML = "Not read";
        }
        let cell3 = tableRow.insertCell(3);
        let button = document.createElement("button");
        button.innerHTML = "Delete book";
        button.setAttribute("data-id", array.indexOf(book));
        button.addEventListener('click', function() {
            let id = button.getAttribute("data-id");
            myLibrary.splice(id, 1);
            render(myLibrary);
        });
        cell3.appendChild(button);
    })
}