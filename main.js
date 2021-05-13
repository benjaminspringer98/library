let myLibrary = [];
let index; // we need this to know which book we should delete later on
let indexToRemove;

function Book(title, author, numberOfPages, read) {
    this.title = title;
    this.author =  author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}

Book.prototype.changeReadStatus = function() {
    if(this.read) {
        this.read = false;
    }
    else {
        this.read = true;
    }
}

const form = document.querySelector("#myForm");
// div where books are displayed in cards:
const cards = document.querySelector(".cards");
// all cards:
let allCards;
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
    myForm.reset();
}

function addBook() {
    let bookName = document.querySelector("#bookName").value;
    let author = document.querySelector("#bookAuthor").value;
    let pages = document.querySelector("#numberOfPages").value;
    let read;
    let checkboxValue = document.querySelector("#read").checked;
    if(checkboxValue) {
        read = true;
    }
    else {
        read = false;
    }
    const book = new Book(bookName, author, pages, read);
    
    myLibrary = JSON.parse(localStorage.getItem("storedLibrary") || "[]");
    myLibrary.push(book); 
    localStorage.setItem("storedLibrary", JSON.stringify(myLibrary)); // save array of books to local storage
    //index = myLibrary.length-1; // get the index of the currently "newest" book
    closeModal();
    updateLibrary(book);
}

function updateLibrary(book) {
    // create the card
    const card = document.createElement("div");
    card.classList.add("card");

    // we need to link the DOM element (card) to the index of the myLibary array
    card.setAttribute("data", myLibrary.indexOf(book));

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

    // add button to change read status to the card:
    const changeReadStatusButton = document.createElement("button");
    changeReadStatusButton.id = "changeReadStatusButton";
    if(book.read) {
        changeReadStatusButton.textContent = "Read";
        changeReadStatusButton.style.backgroundColor = "rgb(187, 236, 187)";
    }
    else {
        changeReadStatusButton.textContent = "Not Read";
        changeReadStatusButton.style.backgroundColor = "rgb(252, 120, 120)";
    }
    card.append(changeReadStatusButton);
    
    /* important to add the event listeners here, because if there are no cards displayed
     there would also be no delete buttons,
     resulting in an error */
    deleteButton.addEventListener("click", deleteBook);
    changeReadStatusButton.addEventListener("click", () => {
        // change the read status displayed on the button:
        if(book.read) {
            changeReadStatusButton.textContent = "Not read";
            changeReadStatusButton.style.backgroundColor = "rgb(252, 120, 120)";
        } 
        else {
            changeReadStatusButton.textContent = "Read";
            changeReadStatusButton.style.backgroundColor = "rgb(187, 236, 187)";
        }

        // Book's prototype doesn't get parsed into JSON so we need to set it manually in order for the function to change read status to work
        if(Object.getPrototypeOf(book) !== Book.prototype) {
            Object.setPrototypeOf(book, Book.prototype);
        }
        // change the read status in the book object:
        book.changeReadStatus();
        localStorage.setItem("storedLibrary", JSON.stringify(myLibrary)); 
    });
}

function deleteBook() {
    // delete book from array:
    indexToRemove = this.parentElement.getAttribute("data");

    myLibrary = JSON.parse(localStorage.getItem("storedLibrary") || "[]");
    myLibrary.splice(indexToRemove, 1);    
    localStorage.setItem("storedLibrary", JSON.stringify(myLibrary));   

    /* we have associated the DOM Elements with the book objects
    by adding data attributes to the corresponding card, but these
    don't automatically change if we delete a book from the array, 
    so we have to do this manually: */
    allCards = document.querySelectorAll(".card");
    allCards.forEach(adjustDataValue);

    // finally remove the card from the DOM:
    this.parentElement.remove();   
}

function adjustDataValue(item, i) {
    // reduce the data attributes of all cards by one, that are above the removed one
    if(i > indexToRemove) {
        let currentIndex = Number(item.getAttribute("data"));
        item.setAttribute("data", currentIndex-1);
    }
}

// load library when user opens the page
myLibrary = myLibrary = JSON.parse(localStorage.getItem("storedLibrary") || "[]");
myLibrary.forEach(book => updateLibrary(book));

/* close the modal if the user clicks anywhere else outside the modal content */
window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}

