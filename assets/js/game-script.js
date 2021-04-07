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

    let difficulty; //difficulty aid using pathname taken from Stack Overflow (credited in README)
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
        {score: 120, name: "Jonah Lomu"},
        {score: 110, name: "Dan Carter"},
        {score: 100, name: "Johnny Wilkinson"},
        {score: 90, name: "Brian Habana"},
        {score: 80, name: "Richie McCaw"},
        {score: 70, name: "Finn Russell"},
        {score: 65, name: "Cheslin Kolbe"},
        {score: 55, name: "David Campese"},
        {score: 50, name: "Sonny Bill Williams"},
        {score: 45, name: "Shane Williams"},
    ];
    let highScores = JSON.parse(localStorage.getItem("highScores")) || defHighScores;
    let highScoresList = document.getElementById("highScoresList");
    let clearStorage = document.getElementById("clearStorage");
    let bgMusic = new Audio("assets/audio/bgmusic.wav");
    let flipSound = new Audio("assets/audio/cardflip.wav");
    let matchSound = new Audio("assets/audio/match.wav");
    let victorySound = new Audio("assets/audio/victory.wav");
    let gameOverSound = new Audio("assets/audio/gameover.wav");
    let soundEffects = false;
    let soundButton = document.getElementById("sound-effects");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;

    /*
    Help with soundEffects functions taken from Port Exe (credited in README)
    */
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

    function gameLoss() { //gameOverSounds plays when the user fails to match all the cards within the timeframe. Called in the gameOver function. 
        stopMusic(); //stops the bgMusic so background music and game over sounds aren't playing at the same time.
        gameOverSound.play();
    }

    function musicToggle() { //function called when the user clicks the audio button in the logo bar
        if(!soundEffects) {
            soundEffects = true;
            soundButton.innerHTML = `<i class="fas fa-volume-mute"></i>`; //if the soundEffects are true, bgMusic will play and the icon will be set to the mute icon.
            startMusic();
        } else {
            soundEffects = false;
            soundButton.innerHTML = `<i class="fas fa-volume-up"></i>`; //else when soundEffects are false, stopMusic function called, and the icon will be set to volume up icon.
            stopMusic();
        }
    }

    function startGame() { //removes the overlay with the text of "Kick Off", so the game can begin.
        overlays.classList.remove("visible");
    }

    /*
    Help with flipCard function taken from Marina Ferreira (credited in README)
    */
    function flipCard() {
        if(lockBoard) return; //prevents any card flipping before the cards are hidden or match
        if(this === firstCard) return; //prevents the same card from being clicked twice, by asking if it is the first card clicked. 

        this.classList.add("flip"); //adds the "flip" class to the individual card that was clicked.
        if(soundEffects == true) { //flipSound plays when soundEffects are true. 
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
    Help with countdown function taken from Scotch (credited in README)
    */
    function countDownBegin() {
        countDown = setInterval(function() {
            timeRemaining--; //time-remaining reduces by one every second
            timer.innerHTML = timeRemaining; //changes the html content.
            if(timeRemaining === 0) //when time-remaining is equal to 0, triggers the game over function.
                gameOver();
        }, 1000); //number reduces every second
    }

    /*
    Help with flipsCounter functions taken from Port Exe (credited in README)
    */
    function flipsCounter() { //function called in the flipCard function
        movesCounter++; //increments the movesCounter by one everytime a card is flipped.
        counter.innerHTML = movesCounter; //shows the moves the user has made.
        if(movesCounter == 1) {
            countDownBegin(); //countDownBegin function called once the player has made their first move.
        }
    }

    /*
    Help with checkForMatch function taken from Marina Ferreira (credited in README)
    */
    function checkForMatch() { //checkForMatch function called in the flipCard function
        if(firstCard.dataset.logo === secondCard.dataset.logo) { //if the firstCard and secondCard data-logo's are equal fires matchedCard function.
            matchedCards();
            if(soundEffects == true) {  //matchSound plays when the soundEffects are true.  
                match();
            }
            
        } else {  // if the firstCard and secondCard data-logo's are not equal fires the unmatchedCards function.
            unmatchedCards();
        }
    }

    /*
    Help with matchedCards function taken from Marina Ferreira (credited in README)
    */
    function matchedCards() {
        firstCard.removeEventListener("click", flipCard); //if the cards match - removes event listener so the cards cannot be flipped back.
        secondCard.removeEventListener("click", flipCard); //if the cards match - removes event listener so the cards cannot be flipped back.
        matchedCardsArray.push(firstCard); //adds the firstcard clicked to the matchedCardsArray
        matchedCardsArray.push(secondCard); //adds the secondcard clicked to the matchedCardsArray
        if(matchedCardsArray.length === cardsArray.length) { //if the amount of cards in the matchedCardsArray is equal to the number of cards in the cardsArray fire the victory function
            victory();
        }

        resetBoard();
    }

    /*
    Help with unmatchedCards function taken from Marina Ferreira (credited in README)
    */
    function unmatchedCards() {
        lockBoard = true; //board becomes unlocked only after the cards have been flipped

        setTimeout(() => { //1 second delay when cards do not match before being turned back over. 
            firstCard.classList.remove("flip"); //if cards do not match removes the flip class, and flips back over.
            secondCard.classList.remove("flip"); //if cards do not match removes the flip class, and flips back over.

            resetBoard();
        }, 1000); //delays the cards from being turned back by 1 second
    }

    /*
    Help with resetBoard function taken from Marina Ferreira (credited in README)
    */
    function resetBoard() { //resets the firstCard & secondCard variables and is called when 2 cards either match or do not match. 
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function victory() {
        clearInterval(countDown); //stops the countdown.
        /*
        Help with finishTime & finishMoves taken from Port Exe (credited in README)
        */
        finishTime = timer.innerHTML; //finishTime variable set to the timer content.
        finishMoves = movesCounter; //finishMoves variable set to the movesCounter.
    
        if(difficulty === "AMATEUR") {
            if(movesCounter <= 30) { //star & points calculated based on the number of moves made.
                points = 80; //80 points if user has made 30 moves or less.
                $("#star1,#star2,#star3,#star4,#star5").css({"color": "#c8831b", "opacity": "1"}); //5 stars shown if user has made 30 moves or less.
            } else if (movesCounter <= 35) {
                points = 60; //60 points if the user has made 35 moves or less.
                $("#star1,#star2,#star3,#star4").css({"color": "#c8831b", "opacity": "1"}); //4 stars shows if the user has made 35 moves or less.
            } else if (movesCounter <= 40) {
                points = 40; //40 points if the user has made 40 moves or less.
                $("#star1,#star2,#star3").css({"color": "#c8831b", "opacity": "1"}); //3 stars shown if the user has made 40 moves or less.
            } else if (movesCounter <= 45) {
                points = 20; //20 points if the user has made 45 moves or less.
                $("#star1,#star2").css({"color": "#c8831b", "opacity": "1"}); //2 stars shown if the user has made 45 moves or less.
            } else {
                points = 0; //0 points when user has made 46+ moves.
                $("#star1").css({"color": "#c8831b", "opacity": "1"}); //1 star shown when user has made 46+ moves.
            }
        } else if(difficulty === "PRO") {
            if(movesCounter <= 35) { //star & points calculated based on the number of moves made.
                points = 80; //80 points if user has made 35 moves or less.
                $("#star1,#star2,#star3,#star4,#star5").css({"color": "#c8831b", "opacity": "1"}); //5 stars shown if user has made 35 moves or less.
            } else if (movesCounter <= 40) {
                points = 60; //60 points if the user has made 40 moves or less.
                $("#star1,#star2,#star3,#star4").css({"color": "#c8831b", "opacity": "1"}); //4 stars shows if the user has made 40 moves or less.
            } else if (movesCounter <= 45) {
                points = 40; //40 points if the user has made 45 moves or less.
                $("#star1,#star2,#star3").css({"color": "#c8831b", "opacity": "1"}); // 3 stars shown if the user has made 45 moves or less.
            } else if (movesCounter <= 50) {
                points = 20; //20 if the user has made 50 moves or less.
                $("#star1,#star2").css({"color": "#c8831b", "opacity": "1"}); //2 stars shown if the user has made 50 moves or less.
            } else {
                points = 0; //0 points when user has made 51+ moves.
                $("#star1").css({"color": "#c8831b", "opacity": "1"}); //1 star shown when user has made 51+ moves.
            }
        } else {
            if(movesCounter <= 50) { //star & points calculated based on the number of moves made.
                points = 80; //80 points if user has made 50 moves or less.
                $("#star1,#star2,#star3,#star4,#star5").css({"color": "#c8831b", "opacity": "1"}); //5 stars shown if user has made 50 moves or less.
            } else if (movesCounter <= 65) {
                points = 60; //60 points if the user has made 55 moves or less.
                $("#star1,#star2,#star3,#star4").css({"color": "#c8831b", "opacity": "1"}); //4 stars shows if the user has made 55 moves or less.
            } else if (movesCounter <= 60) {
                points = 40; //40 points if the user has made 60 moves or less.
                $("#star1,#star2,#star3").css({"color": "#c8831b", "opacity": "1"}); // 3 stars shown if the user has made 60 moves or less.
            } else if (movesCounter <= 65) {
                points = 20; //20 points if the user has made 65 moves or less.
                $("#star1,#star2").css({"color": "#c8831b", "opacity": "1"}); //2 stars shown if the user has made 65 moves or less.
            } else {
                points = 0; //0 points when user has made 66+ moves.
                $("#star1").css({"color": "#c8831b", "opacity": "1"}); //1 star shown when user has made 66+ moves.
            }
        }
        
        //help with final score equation taken from Stack Overflow (credited in README)
        finalScore = parseInt(points) + parseInt(timer.innerHTML); //final score is equal to points dependent on movesCounter and the time-remaining when the last match is made. 
        mostRecentScore.innerHTML = finalScore; // score shows in the victory modal as a result of the finalScore. 

        $("#victory-modal").modal("toggle"); //toggles the victory modal
        if(soundEffects == true) { //gameWin function called if soundEffects are true
            gameWin();
        }
        document.getElementById("totalTime").innerHTML = finishTime; //displays the finishTime in the Victory Modal
        document.getElementById("totalMoves").innerHTML = finishMoves; //displays the finishMoves in the Victory Modal
    }
    
    /*
    Help with saveHighScore event taken from James Q Quick (credited in README)
    */
    saveHighScore = (e) => {
        e.preventDefault(); //prevents the default action from occuring

        let score = {
            score: finalScore, //score value taken from the result of the finalScore variable in the victory function
            name: username.value //name value taken from the input the user enters their name into.
        };
        highScores.push(score); //adds the score to the highScores array
        highScores.sort((a,b) => b.score - a.score); //sorts the score in descending order
        highScores.splice(15); //sets the maximum numbers of results on the leaderboard to 15

        localStorage.setItem("highScores", JSON.stringify(highScores));

        highScoresList.innerHTML = 
        highScores.map(score => {
        return `<li class="resultName">${score.name} - <span class="resultScore">${score.score}</span></li>`; //lists all the users high scores and default high scores in the leader board modal
        }).join("");

        $("#leader-modal").modal("toggle"); //opens the leader modal
        $("#victory-modal").modal("toggle"); //closes the victory-modal
    };

    function removeStorage() {
        if (confirm("Are you sure you want to clear the leaderboard? All saved scores will be lost.")) { // confirm alert message aided by Stack Overflow (credited in README)
            localStorage.clear(); //clears localStorage so any saved names are removed from the leaderboard
            window.location.href = "index.html"; //takes the user back to the home page if users confirms to clear localStorage
        }
    }

    function gameOver() {
        clearInterval(countDown); //stops the countdown
        $("#game-over-modal").modal("toggle"); //toggles the gameOver modal
        if(soundEffects == true) { //gameLoss function called if soundEffects are true
            gameLoss();
            gameOverSound.play();
        }
    }

    /*
    Help with shuffle function taken from Marina Ferreira (credited in README)
    */
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
    username.addEventListener("keyup", () => { //adds an event listener to the save button, and disables it until a name has been entered into the field above
        saveScoreBtn.disabled = !username.value;
    }); 
    clearStorage.addEventListener("click", removeStorage); //adds an event listener to the reset leader board button
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready()); //calls the ready function once the DOM content has loaded.
} else {
    ready(); //calls the ready function
}
