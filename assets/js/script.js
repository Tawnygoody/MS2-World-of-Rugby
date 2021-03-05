const cards = document.querySelectorAll(".gameCard"); //selects all elements with a class of gameCard and stores them in variable - cards
let cardFlipped = false;
let firstCard, SecondCard;

$(document).ready(function() {
    $('.kick-off').fadeIn(1000).removeClass('hidden'); //fades in kick off button on page load
    $("#logo-image").slideDown(1000).removeClass('hidden'); //slides down logo on page load
    $("#rules-button").click(function() {
        $("#rules-info").slideToggle("medium").removeClass("hidden"); //slides down game rules when rules button is clicked
    })

    

    function flipCard() {
        this.classList.add("flip"); //adds class of flip when a gameCard is clicked

        if(!cardFlipped) {
            cardFlipped = true;
            firstCard = this;
            return;
        } else {
            secondCard = this;
            cardFlipped = false
        }

        cardsMatched()
    }

    function cardsMatched() { //cards are matched based on "data-type" and stored in variable isMatch
        let isMatch = firstCard.dataset.logo === secondCard.dataset.logo; isMatch ? lockCards() : unflipCards();
    }

    function lockCards() { //cards are locked in place by removing the event listener for a click event.
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEvenetListener("click", flipCard);
    }

    function unflipCards() { //cards are returned 
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
        }, 1000);
    }


    cards.forEach(card => card.addEventListener("click", flipCard)); //flipCard function executed when a gameCard is clicked
})