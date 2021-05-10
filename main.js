let myLibrary = [];

const cards = document.querySelector(".cards");
const openModalButton = document.querySelector("#openModalButton");
const modal = document.querySelector("#myModal");
const close = document.getElementsByClassName("close")[0];
const addBookButton = document.querySelector("#addBookButton");

openModalButton.addEventListener("click", openModal);
close.addEventListener("click", closeModal);
addBookButton.addEventListener("click", addBook);


function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function addBook() {
    let bookName = document.querySelector("#bookName").value;
    let author = document.querySelector("#bookAuthor").value;
    let pages = document.querySelector("#numberOfPages").value;
    const book = new Book(bookName, author, pages, true);
    myLibrary.push(book);
    closeModal();
    updateLibrary(book);
}

function updateLibrary(book) {
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
}

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
});


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

