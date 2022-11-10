//global arrays and variables
let myLibrary = [];
let submitBtn = document.getElementById('submit');
let form = document.getElementById('form');
let cardSection = document.getElementById('card_section');

//add a book btn
let addBookBtn = document.getElementById('add_book_btn');
addBookBtn.addEventListener('click', () => {
    form.classList.add('display');
});

// //object constructor
// function Book(author, title, pages, read) {
//     this.author = author;
//     this.title = title;
//     this.pages = pages;
//     this.read = read; 
// }

//rewrite the object constructor to class
class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read; 
    }

    toggleRead() {
        return this.read = !this.read;
    }
}

// //add a toggle function to Book prototype
// Book.prototype.toggleRead = function () {
//     return this.read = !this.read;
// }

//function to create an object, and adds it to the myLibrary array
function addBookToLibrary() {

    //get the values from the form input
    let form_author = document.getElementById('author').value;
    let form_title = document.getElementById('title').value;
    let form_pages = parseInt(document.getElementById('pages').value);
    let form_read = document.getElementById('read').checked;

    //create a newBook object using a constructor
    const newBook = new Book(form_author, form_title, form_pages, form_read);

    //add a new object to myLibrary array
    myLibrary.push(newBook);
    
}

//function to create a card 
function createCard (el) {

    //create DOM elements and text content
    const div_card = document.createElement('div');
    div_card.classList.add('card');
    const p_author = document.createElement('p');
    const p_title = document.createElement('p');
    const p_pages = document.createElement('p');
    const p_read = document.createElement('p');
    p_author.textContent = "Author: " + el.author;
    p_title.textContent = "Title: " + el.title;
    p_pages.textContent = "Number of pages: " + el.pages;
   
    //readBtn
    const readBtn = document.createElement('button');
    if (el.read == true) {
        readBtn.classList.add('readBtn','btn','btn-success','mb-2');
        readBtn.textContent = "Read";
    } else {
        readBtn.classList.add('readBtn','btn','btn-secondary','mb-2');
        readBtn.textContent = "Not Read";
    }
    
     //deleteBtn
     const deleteBtn = document.createElement('button');
     deleteBtn.classList.add('deleteBtn', 'btn', 'btn-outline-danger');
     deleteBtn.textContent = 'Delete';

    //append nodes to the elements
    div_card.appendChild(p_author);
    div_card.appendChild(p_title);
    div_card.appendChild(p_pages);
    div_card.appendChild(p_read);
    div_card.appendChild(readBtn);
    div_card.appendChild(deleteBtn);
    cardSection.appendChild(div_card);

    //set data-attribute with myLibrary index number
    div_card.setAttribute('data-attribute', myLibrary.indexOf(el));
}

//function to remove all DOM elements under .card_section
//instruction from https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
function removeCards () {
    while (cardSection.firstChild) {
    cardSection.removeChild(cardSection.firstChild);
}}


//deleteBtn function
function deleteBtns () {
    let deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', (e) => {
            let index = e.target.parentElement.getAttribute('data-attribute');
            myLibrary.splice(index, 1);
            removeCards();
            displayAllCards();
        })
    })
}

//readBtn function
function readBtns () {
    let readBtns = document.querySelectorAll('.readBtn');
    readBtns.forEach((readBtn) => {
        readBtn.addEventListener('click', (e) => {
            let index = e.target.parentElement.getAttribute('data-attribute');
            myLibrary[index].toggleRead();
            removeCards();
            displayAllCards();
        })
    })
}

//function to display all elements(book objects) in the myLibrary array 
function displayAllCards () {
    myLibrary.forEach(el => createCard(el));
    deleteBtns();
    readBtns();
}

//eventlistner click for the submit button to invoke three functions above
submitBtn.addEventListener('click', () => {
    
    addBookToLibrary();
    removeCards();
    displayAllCards();

})











