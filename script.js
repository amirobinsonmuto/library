//  global arrays and variables
const myLibrary = [];
const submitBtn = document.getElementById("submit");
const form = document.getElementById("form");
const cardSection = document.getElementById("card_section");
const author = document.getElementById("author");
const title = document.getElementById("title");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const body = document.getElementById("body");
// form validation variables and functions
let errorMessageArr = [];
const errorMessage = document.getElementById("error-message");
const modal = document.getElementById("add_a_book_modal");

//  add a book btn
const addBookBtn = document.getElementById("add_book_btn");
addBookBtn.addEventListener("click", () => {
  clearErrorMessage();
  modal.style.display = "block";
  form.classList.add("display");
  const modalBackdrop = document.querySelector(".modal-backdrop");
  modalBackdrop.style.display = "block";
});

class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    return (this.read = !this.read);
  }
}

// function to create an object, and adds it to the myLibrary array
function addBookToLibrary() {
  // create a newBook object using a constructor
  const newBook = new Book(author.value, title.value, pages.value, read.value);

  // add a new object to myLibrary array
  myLibrary.push(newBook);
}

// function to create a card
function createCard(el) {
  // create DOM elements and text content
  const div_card = document.createElement("div");
  div_card.classList.add("card");
  const p_author = document.createElement("p");
  const p_title = document.createElement("p");
  const p_pages = document.createElement("p");
  p_author.textContent = "Author: " + el.author;
  p_title.textContent = "Title: " + el.title;
  p_pages.textContent = "Number of pages: " + el.pages;

  // readBtn
  const readBtn = document.createElement("button");
  if (el.read) {
    readBtn.classList.add("readBtn", "btn", "btn-success", "mb-2");
    readBtn.textContent = "Read";
  } else {
    readBtn.classList.add("readBtn", "btn", "btn-secondary", "mb-2");
    readBtn.textContent = "Not Read";
  }

  // deleteBtn
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn", "btn", "btn-outline-danger");
  deleteBtn.textContent = "Delete";

  // append nodes to the elements
  div_card.append(p_author, p_title, p_pages, readBtn, deleteBtn);
  cardSection.appendChild(div_card);

  // set data-attribute with myLibrary index number
  div_card.setAttribute("data-attribute", myLibrary.indexOf(el));
}

// function to remove all DOM elements under .card_section
function removeCards() {
  while (cardSection.firstChild) {
    cardSection.removeChild(cardSection.firstChild);
  }
}

// deleteBtn function
function deleteBtns() {
  let deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      let index = e.target.parentElement.getAttribute("data-attribute");
      myLibrary.splice(index, 1);
      removeCards();
      displayAllCards();
    });
  });
}

// readBtn function
function readBtns() {
  let readBtns = document.querySelectorAll(".readBtn");
  readBtns.forEach((readBtn) => {
    readBtn.addEventListener("click", (e) => {
      let index = e.target.parentElement.getAttribute("data-attribute");
      myLibrary[index].toggleRead();
      removeCards();
      displayAllCards();
    });
  });
}

// function to display all elements(book objects) in the myLibrary array
function displayAllCards() {
  myLibrary.forEach((el) => createCard(el));
  deleteBtns();
  readBtns();
}

function checkError(inp) {
  if (inp.validity.valueMissing) {
    errorMessageArr.push(`Please fill out the ${inp.name} field.`);
  }
}

function showError() {
  if (errorMessageArr.length >= 1) {
    errorMessageArr.forEach((el) => {
      let para = document.createElement("p");
      para.textContent = el;
      errorMessage.append(para);
    });
  }
}

function clearErrorMessage() {
  while (errorMessage.firstChild) {
    errorMessage.removeChild(errorMessage.firstChild);
  }
}

function checkInput() {
  if (
    !author.validity.valueMissing &&
    !title.validity.valueMissing &&
    !pages.validity.valueMissing &&
    !read.validity.valueMissing
  ) {
    submitBtn.classList.remove("disable-click");
    submitBtn.classList.remove("btn-light");
    submitBtn.classList.add("btn-primary");
  }
}

author.addEventListener("input", checkInput);
title.addEventListener("input", checkInput);
pages.addEventListener("input", checkInput);
read.addEventListener("input", checkInput);

// eventlistner click for the submit button to invoke three functions above
form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    errorMessageArr = [];
    clearErrorMessage();
    checkError(author);
    checkError(title);
    checkError(pages);
    checkError(read);
    showError();
    submitBtn.classList.add("disable-click");
    submitBtn.classList.remove("btn-primary");
    submitBtn.classList.add("btn-light");
    e.preventDefault();
  } else {
    addBookToLibrary();
    removeCards();
    displayAllCards();
    form.reset();
    modal.style.display = "none";
    const modalBackdrop = document.querySelector(".modal-backdrop");
    modalBackdrop.style.display = "none";
    submitBtn.classList.remove("disable-click");
    body.removeAttribute;
    e.preventDefault();
  }
});
