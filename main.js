let myLibrary = [];
let index; // we need this to know which book we should delete later on

const form = document.querySelector("#myForm");
const cards = document.querySelector(".cards");
const openModalButton = document.querySelector("#openModalButton");
const modal = document.querySelector("#myModal");
const close = document.getElementsByClassName("close")[0];
const addBookButton = document.querySelector("#addBookButton");
const deleteButton = document.querySelector(".delete");

openModalButton.addEventListener("click", openModal);
close.addEventListener("click", closeModal);
addBookButton.addEventListener("click", addBook);

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    myForm.reset();
}

function addBook() {
    let bookName = document.querySelector("#bookName").value;
    let author = document.querySelector("#bookAuthor").value;
    let pages = document.querySelector("#numberOfPages").value;
    const book = new Book(bookName, author, pages, true);
    myLibrary.push(book);
    index = myLibrary.length-1; // get the index of the currently "newest" book
    closeModal();
    updateLibrary(book);
}

function updateLibrary(book) {
    // create the card
    const card = document.createElement("div");
    card.classList.add("card");

    // we need to link the DOM element (card) to the index of the myLibary array
    card.setAttribute("data", index);

    // add button to delete the book to the card: 
    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = "&times;";
    deleteButton.classList.add("delete");
    card.append(deleteButton);

    // display the object's (the book's) values in the card:
    const titlePara = document.createElement("p");
    titlePara.textContent = `Title: ${book.title}`;
    card.append(titlePara);
    const authorPara = document.createElement("p");
    authorPara.textContent = `Author: ${book.author}`;
    card.append(authorPara);
    const pagesPara = document.createElement("p");
    pagesPara.textContent = `Pages: ${book.numberOfPages}`;
    card.append(pagesPara);
    cards.append(card);   

    /* important to add the event listener here, because if there are no cards displayed there would also be no delete buttons,
     resulting in an error */
    deleteButton.addEventListener("click", deleteBook);
}

function deleteBook() {
    // delete book from array:
    let indexToRemove = this.parentElement.getAttribute("data");
    myLibrary.splice(indexToRemove, 1);
    // and remove it from the DOM:
    this.parentElement.remove();
}

/* for later usage with database, when the user loads the page and there are books already saved:
myLibrary.forEach(function (book) {
    const card = document.createElement("div");
    card.classList.add("card");
    const titlePara = document.createElement("p");
    titlePara.textContent = book.title;
    card.append(titlePara);
    const authorPara = document.createElement("p");
    authorPara.textContent = book.author;
    card.append(authorPara);
    const pagesPara = document.createElement("p");
    pagesPara.textContent = book.numberOfPages;
    card.append(pagesPara);
    cards.append(card);   
});*/


/* close the modal if the user clicks anywhere else outside the modal content */
window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}

function Book(title, author, numberOfPages, read) {
    this.title = title;
    this.author =  author;
    this.numberOfPages = numberOfPages;
    this.read = read;
    /*this.info = function() {
        return `${this.title} by ${this.author}, ${numberOfPages} pages, ${this.read ? "read" : "not read yet"}`;
    };*/
}

