let myLibrary = [];

let submitBtn = document.getElementById('submit');

//object constructor
function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read; //yes or no
}

function addBookToLibrary() {

    let form_author = document.getElementById('author').value;
    let form_title = document.getElementById('title').value;
    let form_pages = parseInt(document.getElementById('pages').value);
    let form_read = document.getElementById('read').value;

    const newBook = new Book(form_author, form_title, form_pages, form_read);

    // const newBook = new Book("JK", "Harry", 98, "yes");

    myLibrary.push(newBook);

    console.log(myLibrary);

    return myLibrary;
}

submitBtn.addEventListener('click', () => {
    addBookToLibrary();
});






