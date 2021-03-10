const cards = Array.from(document.getElementsByClassName("game-card")); //creates an array of all the game-cards. 

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add("flip");

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.logo === secondCard.dataset.logo) {
        matchedCards();
    } else {
        unmatchedCards();
    }
}

function matchedCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unmatchedCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener("click", flipCard)); //adds an event listener to each game-card and calls flipcard function when clicked.