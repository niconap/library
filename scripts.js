let myLibrary = [];
let form = false;

// Select elements on the page
const addbook = document.getElementById("addbook");

// Add eventlistener to the button
addbook.addEventListener("click", popUpForm);
// add.addEventListener("click", addBookToLibrary);

// Make the form pop up
function popUpForm() {
    if (form == false){
        let input = document.getElementById("input")
        let title = document.createElement("input");
        title.setAttribute("type", "text");
        title.setAttribute("id", "title")
        input.appendChild(title);
        let author = document.createElement("input");
        author.setAttribute("type", "text");
        author.setAttribute("id", "author")
        input.appendChild(author);
        let read = document.createElement("input");
        read.setAttribute("type", "checkbox");
        read.setAttribute("id", "read")
        input.appendChild(read);
        let par = document.createElement("p");
        par.innerHTML = "Read?";
        par.setAttribute("id", "par");
        input.appendChild(par);
        let add = document.createElement("button");
        add.setAttribute("id", "add")
        add.innerHTML = "Add"
        input.appendChild(add);
        const lib = document.getElementById("lib");
        const ttl = document.getElementById("title");
        const ath = document.getElementById("author");
        const rd = document.getElementById("read");
        const ad = document.getElementById("add");
        ad.addEventListener("click", function(){
            addBookToLibrary(ttl.value, ath.value, rd.checked);
        });
        form = true;
    } else {
        return;
    }
}

// Delete the form
function deleteForm () {
    let title = document.getElementById("title");
    title.parentNode.removeChild(title);
    let author = document.getElementById("author");
    author.parentNode.removeChild(author);
    let read = document.getElementById("read");
    read.parentNode.removeChild(read);
    let add = document.getElementById("add");
    add.parentNode.removeChild(add);
    let par = document.getElementById("par");
    par.parentNode.removeChild(par);
    form = false;
}

// Construct book
function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

// Make a new book and render on the page
function addBookToLibrary(title, author, read) {
    if (title == "" || author == "") {
        alert("Please enter a title and an author!");
    } else {
        myLibrary.push(new Book(title, author, read));
        deleteForm();
        render(myLibrary);
    }
}

// Append elements to show all books on the page
// and add a button to delete the book
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
        let cell4 = tableRow.insertCell(4);
        let readButton = document.createElement("button");
        readButton.innerHTML = "Read book";
        readButton.setAttribute("data-id", array.indexOf(book));
        readButton.addEventListener('click', function() {
            let id = readButton.getAttribute("data-id");
            array[id].read = true;
            render(myLibrary);
        });
        if (book.read == false) {
            cell4.appendChild(readButton);
        }
    })
}