function ready() {
    /*
    Variables
    */
    const cards = Array.from(document.getElementsByClassName("game-card")); //creates an array of all the game-cards. 
    let overlays = document.getElementById("overlay-text");
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let cardsArray = cards;
    let matchedCardsArray = [];

    let difficulty; //difficulty aid using pathname taken from https://stackoverflow.com/questions/21265919/location-pathname-indexof-not-working-with-or
    if(window.location.pathname.indexOf("amateur") != -1) { // if the pathname contains amateur the gameType will be set to AMATEUR
        difficulty = "AMATEUR";
    } else if(window.location.pathname.indexOf("pro") != -1) { // if the pathname contains pro the gameType will be set to PRO
        difficulty = "PRO";
    } else { // if the pathname contains leg the gameType will be set to LEGEND
        difficulty = "LEGEND";
    }

    let startTime;
    if (difficulty === "AMATEUR") {
        startTime = 60;
    } else if (difficulty === "PRO") {
        startTime = 80;
    } else {
        startTime = 100;
    }

    let timeRemaining = startTime;
    let timer = document.getElementById("time-remaining");
    let countDown;
    let finishTime;
    let counter = document.getElementById("flips");
    let movesCounter = 0;
    let finishMoves;

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
    let soundEffects = "off";
    let soundButton = document.getElementById("sound-effects")
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

    function audioToggle() {
        if(soundEffects === "on") {
            soundButton.innerHTML = `<i class="fas fa-volume-mute"></i>`;
            startMusic();
        } else {
            soundButton.innerHTML = `<i class="fas fa-volume-up"></i>`;
            stopMusic();
        }
    }

    function musicToggle() {
        if(soundEffects === "off") {
            soundEffects = "on";
        } else {
            soundEffects = "off";
        }
        audioToggle();
    }
    /*
    Game Music Section Ends
    */

    function startGame() {
        overlays.classList.remove("visible");
    }

    function flipCard() {
        if(lockBoard) return;
        if(this === firstCard) return; //prevents the same card from being clicked twice. 

        this.classList.add("flip"); //adds the "flip" class to the individual card that was clicked.
        if(soundEffects == "on") {   
            flip();
        }
        
        flipsCounter();

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

    function flipsCounter() {
        movesCounter++;
        counter.innerHTML = movesCounter;
        if(movesCounter == 1) {
            countDownBegin(); //countdown begins once the players has made their first move.
        }
    }

    function checkForMatch() {
        if(firstCard.dataset.logo === secondCard.dataset.logo) { //if the firstCard and secondCard data-logo's are equal fires matchedCard function.
            matchedCards();
            if(soundEffects == "on") {   
                match();
            }
            
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
        finishTime = timer.innerHTML;
        finishMoves = movesCounter

        if(difficulty === "AMATEUR") {
            if(movesCounter <= 25) { //star rating system based on the number of moves made.
                $("#star1,#star2,#star3,#star4,#star5").css({"color": "#c8831b", "opacity": "1"})
            } else if (movesCounter <= 30) {
                $("#star1,#star2,#star3,#star4").css({"color": "#c8831b", "opacity": "1"})
            } else if (movesCounter <= 35) {
                $("#star1,#star2,#star3").css({"color": "#c8831b", "opacity": "1"})
            } else if (movesCounter <= 40) {
                $("#star1,#star2").css({"color": "#c8831b", "opacity": "1"})
            } else {
                $("#star1").css({"color": "#c8831b", "opacity": "1"})
            }
        } else if(difficulty === "PRO") {
            if(movesCounter <= 35) { //star rating system based on the number of moves made.
                $("#star1,#star2,#star3,#star4,#star5").css({"color": "#c8831b", "opacity": "1"})
            } else if (movesCounter <= 40) {
                $("#star1,#star2,#star3,#star4").css({"color": "#c8831b", "opacity": "1"})
            } else if (movesCounter <= 45) {
                $("#star1,#star2,#star3").css({"color": "#c8831b", "opacity": "1"})
            } else if (movesCounter <= 50) {
                $("#star1,#star2").css({"color": "#c8831b", "opacity": "1"})
            } else {
                $("#star1").css({"color": "#c8831b", "opacity": "1"})
            }
        } else {
            if(movesCounter <= 50) { //star rating system based on the number of moves made.
                $("#star1,#star2,#star3,#star4,#star5").css({"color": "#c8831b", "opacity": "1"})
            } else if (movesCounter <= 55) {
                $("#star1,#star2,#star3,#star4").css({"color": "#c8831b", "opacity": "1"})
            } else if (movesCounter <= 60) {
                $("#star1,#star2,#star3").css({"color": "#c8831b", "opacity": "1"})
            } else if (movesCounter <= 65) {
                $("#star1,#star2").css({"color": "#c8831b", "opacity": "1"})
            } else {
                $("#star1").css({"color": "#c8831b", "opacity": "1"})
            }
        }

        $("#victory-modal").modal("toggle"); //toggles the victory modal
        if(soundEffects == "on") {   
            gameWin();
        }
        document.getElementById("totalTime").innerHTML = finishTime; //displays the finishTime in the Victory Modal
        document.getElementById("totalMoves").innerHTML = finishMoves; //displays the finishMoves in the Victory Modal
    }

    function gameOver() {
        clearInterval(countDown);
        $("#game-over-modal").modal("toggle"); //toggles the victory modal
        if(soundEffects == "on") {   
            gameLoss();
        }
    }

    (function shuffle() {
        if(difficulty === "AMATEUR") {
            cards.forEach(card => { //iterate through cards Array.
                let randomPos = Math.floor(Math.random() * 16); //generates a random number between 0-15 and assigns to each card. 
                card.style.order = randomPos; //random number applied to the order property. 
            });
        } else if(difficulty === "PRO") {
            cards.forEach(card => { //iterate through cards Array.
                let randomPos = Math.floor(Math.random() * 20); //generates a random number between 0-19 and assigns to each card. 
                card.style.order = randomPos; //random number applied to the order property. 
            });
        } else {
            cards.forEach(card => { //iterate through cards Array.
                let randomPos = Math.floor(Math.random() * 24); //generates a random number between 0-23 and assigns to each card. 
                card.style.order = randomPos; //random number applied to the order property. 
            });
        }
    })(); //immediately invoked function.


    // Event Listeners
    cards.forEach(card => card.addEventListener("click", flipCard)); //adds an event listener to each game-card and calls flipcard function when clicked.
    overlays.addEventListener("click", startGame); //adds an event listener to the overlay and calls startGame function when clicked
    soundButton.addEventListener("click", musicToggle); //adds an event listener to the soundbutton and calls musicToggle function when clicked


}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}
