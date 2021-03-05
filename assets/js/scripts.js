class AudioController {
    constructor() {
        this.bgMusic = new Audio("assets/audio/bgmusic.wav");
        this.flipSound = new Audio("assets/audio/cardflip.wav");
        this.matchSound = new Audio("assets/audio/match.wav");
        this.victory = new Audio("assets/audio/victory.wav");
        this.gameOver = new Audio("assets/audio/gameover.wav");
        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;

    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victory.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOver.play();
    }
}

$(document).ready(function() {

    function ready() {
        let cards = Array.from(document.getElementsByClassName("gameCard"));

        cards.forEach(card => {
            card.addEventListener("click", () => {
                //flipCard();
            })
        })
    }


})

let audioController = new AudioController();