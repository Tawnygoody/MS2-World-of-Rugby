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
    } else { // the default difficulty will be set to "Legend"
        difficulty = "LEGEND";
    }

    let startTime;
    if (difficulty === "AMATEUR") { //if the difficulty is set to "AMATEUR" the startTime will be 60 seconds
        startTime = 60;
    } else if (difficulty === "PRO") { //if the difficulty is set to "PRO" the startTime will be 80 seconds.
        startTime = 80;
    } else { //the default startTime will be set to 100 seconds. 
        startTime = 100;
    }

    let timeRemaining = startTime;
    let timer = document.getElementById("time-remaining");
    let countDown;
    let finishTime;
    let counter = document.getElementById("flips");
    let movesCounter = 0;
    let finishMoves;
    let points;
    let finalScore;
    let mostRecentScore = document.getElementById("score");
    let username = document.getElementById("username");
    let saveScoreBtn = document.getElementById("saveScoreBtn");
    let defHighScores = [
        {score: 100, name: "Jonah Lomu"},
        {score: 95, name: "Dan Carter"},
        {score: 90, name: "Johnny Wilkinson"},
        {score: 85, name: "Brian Habana"},
        {score: 80, name: "Richie McCaw"},
        {score: 75, name: "Finn Russel"},
        {score: 70, name: "Cheslin Kolbe"},
        {score: 65, name: "David Campese"},
        {score: 60, name: "Sonny Bill Williams"},
        {score: 55, name: "Shane Williams"},
    ];
    let highScores = JSON.parse(localStorage.getItem("highScores")) || defHighScores;
    console.log(highScores);
    let highScoresList = document.getElementById("highScoresList");
    let bgMusic = new Audio("assets/audio/bgmusic.wav");
    let flipSound = new Audio("assets/audio/cardflip.wav");
    let matchSound = new Audio("assets/audio/match.wav");
    let victorySound = new Audio("assets/audio/victory.wav");
    let gameOverSound = new Audio("assets/audio/gameover.wav");
    let soundEffects = "off";
    let soundButton = document.getElementById("sound-effects")
    bgMusic.loop = true;
    bgMusic.volume = 0.3;

    function startMusic() { //bgMusic players when function is called in audioToggle function
        bgMusic.play();
    }

    function stopMusic() { //bgMusic stops and resets to the beginning of the song, when function is called in the audioToggle function
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }

    function flip() { //flipSound plays whenever a card is turned. Called in the flipCard function. 
        flipSound.play();
    }

    function match() { //matchSound plays whenever 2 cards match. Called in the checkForMatch function. 
        matchSound.play();
    }

    function gameWin() { //victorySound plays whenever all the cards have been matched. Called in the victory function. 
        stopMusic(); //stop the bgMusic so background music and victory sounds aren't playing at the same time. 
        victorySound.play();
    }

    function gameLoss() { //gameOverSounds players when not all the cards have been matched within the timeframe. Called in the gameOver function. 
        stopMusic(); //stops the bgMusic so background music and game over sounds aren't playing at the same time.
        gameOverSound.play();
    }

    function audioToggle() {
        if(soundEffects === "on") { //if the soundEffects are on, bgMusic will play and the icon will be set to the mute button, should the user want to mute soundEffects.
            soundButton.innerHTML = `<i class="fas fa-volume-mute"></i>`;
            startMusic();
        } else { //else when soundEffects are off, stopMusic function called, and the icon will be set to volume up button, should the user want soundEffects on. 
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

    function startGame() { //removes the overlay with the text of "Kick Off", so the game can begin.
        overlays.classList.remove("visible");
    }

    function flipCard() {
        if(lockBoard) return;
        if(this === firstCard) return; //prevents the same card from being clicked twice. 

        this.classList.add("flip"); //adds the "flip" class to the individual card that was clicked.
        if(soundEffects == "on") { //flipSound plays when soundEffects are on. 
            flip();
        }
        
        flipsCounter(); //calls the flipsCounter function

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

    function flipsCounter() { //function called in the flipCard function
        movesCounter++; //increments the movesCounter by one everytime a card is flipped.
        counter.innerHTML = movesCounter; //shows the moves the user has made.
        if(movesCounter == 1) {
            countDownBegin(); //countDownBegin function called once the player has made their first move.
        }
    }

    function checkForMatch() { //checkForMatch function called in the flipCard function
        if(firstCard.dataset.logo === secondCard.dataset.logo) { //if the firstCard and secondCard data-logo's are equal fires matchedCard function.
            matchedCards();
            if(soundEffects == "on") {  //matchSound plays when the soundEffects are on.  
                match();
            }
            
        } else {  // if the firstCard and secondCard data-logo's are not equal fires the unmatchedCards function.
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
        }, 1000); //delays the cards from being turned back by 1 second
    }

    function resetBoard() { //prevents the same card from being clicked twice. 
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function victory() {
        clearInterval(countDown); //stops the countdown.
        finishTime = timer.innerHTML; //finishTime variable set to the timer content.
        finishMoves = movesCounter; //finishMoves variable set to the movesCounter.
    
        if(difficulty === "AMATEUR") {
            if(movesCounter <= 25) { //star rating system based on the number of moves made.
                points = 80;
                $("#star1,#star2,#star3,#star4,#star5").css({"color": "#c8831b", "opacity": "1"}) //5 stars shown if user has made 25 moves or less.
            } else if (movesCounter <= 30) {
                points = 60;
                $("#star1,#star2,#star3,#star4").css({"color": "#c8831b", "opacity": "1"}) //4 stars shows if the user has made 30 moves or less.
            } else if (movesCounter <= 35) {
                points = 40;
                $("#star1,#star2,#star3").css({"color": "#c8831b", "opacity": "1"}) // 3 stars shown if the user has made 35 moves or less.
            } else if (movesCounter <= 40) {
                points = 20;
                $("#star1,#star2").css({"color": "#c8831b", "opacity": "1"}) //2 stars shown if the user has made 40 moves or less.
            } else {
                points = 0;
                $("#star1").css({"color": "#c8831b", "opacity": "1"}) //1 star shown when user has made 40+ moves.
            }
        } else if(difficulty === "PRO") {
            if(movesCounter <= 35) { //star rating system based on the number of moves made.
                points = 80;
                $("#star1,#star2,#star3,#star4,#star5").css({"color": "#c8831b", "opacity": "1"}) //5 stars shown if user has made 35 moves or less.
            } else if (movesCounter <= 40) {
                points = 60;
                $("#star1,#star2,#star3,#star4").css({"color": "#c8831b", "opacity": "1"}) //4 stars shows if the user has made 40 moves or less.
            } else if (movesCounter <= 45) {
                points = 40;
                $("#star1,#star2,#star3").css({"color": "#c8831b", "opacity": "1"}) // 3 stars shown if the user has made 45 moves or less.
            } else if (movesCounter <= 50) {
                points = 20;
                $("#star1,#star2").css({"color": "#c8831b", "opacity": "1"}) //2 stars shown if the user has made 50 moves or less.
            } else {
                points = 0;
                $("#star1").css({"color": "#c8831b", "opacity": "1"}) //1 star shown when user has made 50+ moves.
            }
        } else {
            if(movesCounter <= 50) { //star rating system based on the number of moves made.
                points = 80;
                $("#star1,#star2,#star3,#star4,#star5").css({"color": "#c8831b", "opacity": "1"}) //5 stars shown if user has made 50 moves or less.
            } else if (movesCounter <= 55) {
                points = 60;
                $("#star1,#star2,#star3,#star4").css({"color": "#c8831b", "opacity": "1"}) //4 stars shows if the user has made 55 moves or less.
            } else if (movesCounter <= 60) {
                points = 40;
                $("#star1,#star2,#star3").css({"color": "#c8831b", "opacity": "1"}) // 3 stars shown if the user has made 60 moves or less.
            } else if (movesCounter <= 65) {
                points = 20;
                $("#star1,#star2").css({"color": "#c8831b", "opacity": "1"}) //2 stars shown if the user has made 65 moves or less.
            } else {
                points = 0;
                $("#star1").css({"color": "#c8831b", "opacity": "1"}) //1 star shown when user has made 65+ moves.
            }
        }
        
        //help with final score equation taken from https://stackoverflow.com/questions/7658176/adding-two-variables-together
        finalScore = parseInt(points) + parseInt(timer.innerHTML); //final score is equal to points dependent on movesCounter and the time-remaining when the last match is made. 
        mostRecentScore.innerHTML = finalScore; // score shows in the victory modal as a result of the finalScore. 

        $("#victory-modal").modal("toggle"); //toggles the victory modal
        if(soundEffects == "on") { //gameWin function called if soundEffects are on
            gameWin();
        }
        document.getElementById("totalTime").innerHTML = finishTime; //displays the finishTime in the Victory Modal
        document.getElementById("totalMoves").innerHTML = finishMoves; //displays the finishMoves in the Victory Modal
    }

    saveHighScore = (e) => {
        e.preventDefault();

        let score = {
            score: finalScore,
            name: username.value
        };
        highScores.push(score);
        highScores.sort((a,b) => b.score - a.score);
        highScores.splice(15);

        localStorage.setItem("highScores", JSON.stringify(highScores));

        highScoresList.innerHTML = 
        highScores.map(score => {
        return `<li class="scoreList">${score.name} - ${score.score}</li>`; 
        }).join("");

        $("#leader-modal").modal("toggle");
        $("#victory-modal").modal("toggle");
    }

    function gameOver() {
        clearInterval(countDown); //stops the countdown
        $("#game-over-modal").modal("toggle"); //toggles the gameOver modal
        if(soundEffects == "on") { //gameLoss function called if soundEffects are on
            gameLoss();
        }
    }
/*
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
*/
    // Event Listeners
    cards.forEach(card => card.addEventListener("click", flipCard)); //adds an event listener to each game-card and calls flipcard function when clicked.
    overlays.addEventListener("click", startGame); //adds an event listener to the overlay and calls startGame function when clicked
    soundButton.addEventListener("click", musicToggle); //adds an event listener to the soundbutton and calls musicToggle function when clicked
    username.addEventListener("keyup", () => {
        saveScoreBtn.disabled = !username.value;
    });

}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready()); //calls the ready function once the DOM content has loaded.
} else {
    ready(); //calls the ready function
}
