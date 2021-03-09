if(document.readystate === "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}

const cards = document.querySelectorAll(".game-card");
cards.forEach(card => card.addEventListener("click", flipCard));

function ready() {

}


function flipCard() {
    this.classList.add("flip");
}


function startGame() {

}

function disabled() {

}

function shuffleCards() {

}

function checkForMatch() {

}

function cardMatch() {

}

function notCardMatch() {

}

function cardType() {

}

function canFlipCard() {

}

function victory() {

}

function gameOver() {

}

function startCountDown() {

}