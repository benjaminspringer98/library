let myLibrary = [];

function Book(title, author, numberOfPages, read) {
    this.title = title;
    this.author =  author;
    this.numberOfPages = numberOfPages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${numberOfPages} pages, ${this.read ? "read" : "not read yet"}`;
    };
}

// test to generate cards:
const btn = document.querySelector("#cardGeneratorButton");
const cards = document.querySelector(".cards");
btn.addEventListener("click", generateCard);

function generateCard() {
    const card = document.createElement("div");
    card.classList.add("card");
    cards.append(card);
}