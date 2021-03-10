const cards = Array.from(document.getElementsByClassName("game-card")); //creates an array of all the game-cards. 
let overlays = document.getElementById("overlay-text");

/*
Variables
*/
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardsArray = cards;
let matchedCardsArray = [];
let startTime = 60;
let timeRemaining = startTime;
let timer = document.getElementById("time-remaining");
let countDown;
let finishTime;
/*
Variables Ends
*/


/*
game music section
*/
let bgMusic = new Audio("assets/audio/bgmusic.wav");
let flipSound = new Audio("assets/audio/cardflip.wav");
let matchSound = new Audio("assets/audio/match.wav");
let victorySound = new Audio("assets/audio/victory.wav");
let gameOverSound = new Audio("assets/audio/gameover.wav");
bgMusic.loop = true;
bgMusic.volume = 0.3;

function startMusic() {
    bgMusic.play();
}
function stopMusic() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
}

function flip() {
    flipSound.play();
}

function match() {
    matchSound.play();
}

function gameWin() {
    stopMusic();
    victorySound.play();
}

function gameLoss() {
    stopMusic();
    gameOverSound.play();
}
/*
Game Music Section Ends
*/

function startGame() {
    overlays.classList.remove("visible");
    startMusic(); //fires the start music function. 
    countDownBegin(); //fires the countDownBegin function
}

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return; //prevents the same card from being clicked twice. 

    this.classList.add("flip"); //adds the "flip" class to the individual card that was clicked.
    flip();

    if(!hasFlippedCard) { //if hasFlippedCard is false means this is the first time player has clicked a card.
        hasFlippedCard = true;
        firstCard = this;
        return; //stops the function if true.
    }
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch(); //calls checkForMatch function
}

/*
Help with countdown function taken from https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript
*/
function countDownBegin() {
    countDown = setInterval(function() {
        timeRemaining--; //time-remaining reduces by one every second
        timer.innerHTML = timeRemaining; //changes the html content.
        if(timeRemaining === 0) //when time-remaining is equal to 0, triggers the game over function.
            gameOver();
    }, 1000); //number reduces every second
}

function checkForMatch() {
    if(firstCard.dataset.logo === secondCard.dataset.logo) { //if the firstCard and secondCard data-logo's are equal fires matchedCard function.
        matchedCards();
        match();
    } else {  // if the firstCard and secondCard data-logo's are in-equal fires the unmatchedCards function.
        unmatchedCards();
    }
}

function matchedCards() {
    firstCard.removeEventListener("click", flipCard); //if the cards match - removes event listener so the cards cannot be flipped back.
    secondCard.removeEventListener("click", flipCard); //if the cards match - removes event listener so the cards cannot be flipped back.
    matchedCardsArray.push(firstCard); //adds the firstcard clicked to the matchedCardsArray
    matchedCardsArray.push(secondCard); //add the secondcard clicked to the matchedCardsArray
    if(matchedCardsArray.length === cardsArray.length) { //if the amount of cards in the matchedCardsArray is equal to the number of cards in the cardsArray fire the victory function
        victory();
    }

    resetBoard();
}

function unmatchedCards() {
    lockBoard = true; //board becomes unlocked only after the cards have been flipped

    setTimeout(() => { //1 second delay when cards do not match before being turned back over. 
        firstCard.classList.remove("flip"); //if cards do not match removes the flip class, and flips back over.
        secondCard.classList.remove("flip"); //if cards do not match removes the flip class, and flips back over.

        resetBoard();
    }, 1000);
}

function resetBoard() { //prevents the same card from being clicked twice. 
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function victory() {
    clearInterval(countDown);
    $("#victory-modal").modal("toggle"); //toggles the victory modal
    gameWin();
}

function gameOver() {
    clearInterval(countDown);
    finishTime = timer.innerHTML;
    console.log(finishTime)
    $("#victory-modal").modal("toggle"); //toggles the victory modal
    gameWin();
}

(function shuffle() {
    cards.forEach(card => { //iterate through cards Array.
        let randomPos = Math.floor(Math.random() * 16); //generates a random number between 0-15 and assigns to each card. 
        card.style.order = randomPos; //random number applied to the order property. 
    });
})(); //immediately invoked function. 

cards.forEach(card => card.addEventListener("click", flipCard)); //adds an event listener to each game-card and calls flipcard function when clicked.
overlays.addEventListener("click", startGame);