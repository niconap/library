let myLibrary = [];
const loggedOut = document.getElementById('loggedOut');
const loggedIn = document.getElementById('loggedIn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const input = document.getElementById('input');

const auth = firebase.auth();
const userDetails = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.onclick = () => auth.signInWithPopup(provider);
logoutBtn.onclick = () => auth.signOut();

// Insert item into array at a certain index
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

// Append elements to show all books on the page
// and add a button to delete the book
function render(array) {
  lib.innerHTML = '';
  if (array.length != 0) {
    let topRow = lib.insertRow();
    topRow.classList.add('fade-in');
    topRow.insertCell(0).innerHTML = 'Title';
    topRow.insertCell(1).innerHTML = 'Author';
    topRow.insertCell(2).innerHTML = 'Read?';
    topRow.setAttribute('id', 'toprow');
  }
  array.forEach((book) => {
    let tableRow1 = lib.insertRow();
    tableRow1.classList.add('fade-in');
    tableRow1.insertCell(0).innerHTML = book.title;
    tableRow1.insertCell(1).innerHTML = book.author;
    if (book.read) {
      tableRow1.insertCell(2).innerHTML = 'Yes';
    } else {
      tableRow1.insertCell(2).innerHTML = 'No';
    }
    let tableRow2 = lib.insertRow();
    let cell3 = tableRow2.insertCell(0);
    let cell4 = tableRow2.insertCell(1);
    let button = document.createElement('button');
    button.innerHTML = 'Delete book';
    button.setAttribute('data-id', array.indexOf(book));
    button.addEventListener('click', function () {
      let bookIdQuery = db
        .collection('books')
        .where('bookId', '==', book.bookId);
      bookIdQuery.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
      render(myLibrary);
    });
    button.classList.add('fade-in');
    if (book.read == false) {
      cell3.appendChild(button);
    } else {
      cell4.appendChild(button);
    }
    let cell5 = tableRow2.insertCell(2);
    let readButton = document.createElement('button');
    readButton.classList.add('fade-in');
    readButton.innerHTML = 'Mark as read';
    readButton.setAttribute('data-id', array.indexOf(book));
    readButton.addEventListener('click', function () {
      let bookIdQuery = db
        .collection('books')
        .where('bookId', '==', book.bookId);
      bookIdQuery.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({
            read: true,
          });
        });
      });
      render(myLibrary);
    });
    if (book.read == false) {
      cell5.appendChild(readButton);
    }
  });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    loggedOut.hidden = true;
    loggedIn.hidden = false;
    userDetails.innerHTML = `<h2>Hello ${user.displayName}!</h2>`;
    input.hidden = false;
  } else {
    loggedOut.hidden = false;
    loggedIn.hidden = true;
    userDetails.innerHTML = '';
    input.hidden = true;
  }
});

const db = firebase.firestore();
let title = document.getElementById('title');
let author = document.getElementById('author');
let read = document.getElementById('read');
let add = document.getElementById('add');

let booksRef;
let unsubscribe;
let bookId = 0;

auth.onAuthStateChanged((user) => {
  if (user) {
    booksRef = db.collection('books');
    add.onclick = () => {
      if (title.value && author.value) {
        const { serverTimestamp } = firebase.firestore.FieldValue;
        booksRef.add({
          uid: user.uid,
          bookId,
          title: title.value,
          author: author.value,
          read: read.checked,
          createdAt: serverTimestamp(),
        });
        bookId++;
      }
    };

    unsubscribe = booksRef
      .where('uid', '==', user.uid)
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        myLibrary = [];
        querySnapshot.docs.forEach((doc) => {
          let { title, author, read, bookId } = doc.data();
          myLibrary.push({ title, author, read, bookId });
        });
        title.value = '';
        author.value = '';
        read.checked = false;
        render(myLibrary);
      });
  } else {
    unsubscribe && unsubscribe();
    myLibrary = [];
    render(myLibrary);
  }
});
