let myLibrary = [];
let submitBtn = document.getElementById('submit');
let form = document.getElementById('form');
let deleteBtns;
let cardSection = document.getElementById('card_section');

//add a book btn
let addBookBtn = document.getElementById('add_book_btn');
addBookBtn.addEventListener('click', () => {
    form.classList.add('display');
});

//object constructor
function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read; 
}

//creates an object using the constructor and adds to the myLibrary array
function addBookToLibrary() {

    let form_author = document.getElementById('author').value;
    let form_title = document.getElementById('title').value;
    let form_pages = parseInt(document.getElementById('pages').value);
    let form_read = document.getElementById('read').checked;

    const newBook = new Book(form_author, form_title, form_pages, form_read);

    console.log(myLibrary);//delete later
    myLibrary.push(newBook);

    //function to create a div and append the obj Book properties as child
    function createCard () {

        //create DOM elements and nodes
        const div_card = document.createElement('div');
        div_card.classList.add('card');
        const p_author = document.createElement('p');
        const p_title = document.createElement('p');
        const p_pages = document.createElement('p');
        const p_read = document.createElement('p');
        p_author.textContent = form_author;
        p_title.textContent = form_title;
        p_pages.textContent = form_pages;
        p_read.textContent = form_read;
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'Delete';

        //append nodes to the elements
        div_card.appendChild(p_author);
        div_card.appendChild(p_title);
        div_card.appendChild(p_pages);
        div_card.appendChild(p_read);
        div_card.appendChild(deleteBtn);
        cardSection.appendChild(div_card);

        //set data-attribute with myLibrary index number
        let myLibraryIndex = myLibrary.length-1;
        div_card.setAttribute('data-attribute', myLibraryIndex);

        //select delete buttons
        deleteBtns = document.querySelectorAll('.deleteBtn');

        //delete btn function
        deleteBtns.forEach((deleteBtn) => {
            deleteBtn.addEventListener('click', (e) => {
                let index = e.target.parentElement.getAttribute('data-attribute');
                console.log(index);
            })
        })
    }

    createCard(myLibrary[myLibrary.length-1]);
    
}

//execute addBookToLibrary function with a button click
submitBtn.addEventListener('click', () => {
    addBookToLibrary();
});









