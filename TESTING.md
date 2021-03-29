# Testing

Testing has been completed on all devices and browsers listed in the README.md file. 

# Contents
- [Home Page](#home-page)
    - [Kick Off Modal](#kick-off-Modal)
    - [Difficulty Modal](#difficulty-modal)
- [Game Page](#game-page)
    - [Victory Modal](#victory-modal)
    - [Game Over Modal](#game-over-modal)
    - [Leader Board Modal](#leader-board-modal)
- [Functions](#functions)
    - [EmailJS](#emailjs)
    - [Shuffling Cards](#shuffling-cards)
    - [Audio](#audio)
    - [Flipping Cards](#flipping-cards)
    - [Matching Cards](#matching-cards)
    - [Timer](#timer)
    - [Moves Counter](#moves-counter)
    - [Victory](#victory)
    - [Saving High Scores](#saving-high-scores)
    - [Reset the Leader Board](#reset-the-leader-board)
    - [Game Over](#game-over)


# Home Page

- On page load the logo will slide down. 
- On page load the "Kick Off" button will fade in. 
- Click the logo to take the user from the Home page to the Home page. 
- Click the "Kick Off" button to open the "Kick Off" Modal.
- Click the GitHub icon in the footer to take the user to GitHub repository in a new tab. 
- Click the Linkedin icon in the footer to take the user to Linkedin profile in a new tab. 

## Kick Off Modal

- Click outside the modal to take the user back to the Home page.
- Click the "Rules" button to dropdown rules information. 
- Click the "Rules" button a second time to hide the rules information. 
- Click the "New Game" button to open the "Difficulty" modal & close the "Kick Off" modal.
- Click the "Contact Us" button to dropdown a contact form. 
- Click the "Contact Us" button a second time to hide the contact form. 
- Submit enquiry form without entering "Full Name", to reveal "Please fill out this field" message. 
- Submit enquiry form without entering "Email Address", to reveal "Please fill out this field" message. 
- Submit enquiry form without entering "Your Query", to reveal "Please fill out this field" message. 
- Submit enquiry form with all fields filled out, to reveal "Thankyou for your enquiry" alert and ensure contact form has been cleared.

## Difficulty Modal

- Click outside the modal to take the user back to the Home page. 
- Click the "Amateur" button to take the user to the Amateur game page. 
- Click the "Professional" button to take the user to the Professional game page. 
- Click the "Legend" button to take the user to the Legend game page. 
- Click the "Back" button to close the difficulty modal and return the user to the "Kick Off" modal. 

# Game Page

User interactivity is the same on all game pages. The difference being the amount of game cards, dependant on which 
difficulty has been selected. 

- On page load the logo and audio button will slide down.
- Clicking anywhere on the page should remove the "Kick Off" overlay text. 
- Click the logo to take the user from the "Game Page" to the "Home Page". 
- Ensure all audio is switched off as default. 
- Click the audio button to change the icon to a "mute" icon and start background music.
- Click the audio button a second time to change the icon back to a "volume up" icon and stop background music.
- Click the GitHub icon in the footer to take the user to GitHub repository in a new tab. 
- Click the Linkedin icon in the footer to take the user to Linkedin profile in a new tab. 
- Click the "game-cards" to rotate the cards to show the "front-face" image. 

## Victory Modal

- Ensure clicking outside the modal does not close the victory modal. 
- Image of trophy should dance continuously, until the user directs to another modal / page. 
- Filling out the name field and clicking the "Save" button will close the vitory modal, and open the leader board modal. 
- Clicking the "Play Again" button will take the user to the respective game page depending on the difficulty they had chosen.
- Clicking the "Home" button will take the user from the victory modal to the Home page. 

## Game Over Modal

- Ensure clicking outside the modal does not close the Game Over modal.
- Image of a tackle should dance continuously, until the user directs to another modal / page. 
- Clicking the "Play Again" button will take the user to the respective game page depending on the difficulty they had chosen.
- Clicking the "Home" button will take the user from the victory modal to the Home page. 

## Leader Board Modal

- Ensure clicking outside the modal does not close the Leader Board modal.
- Clicking the "Play Again" button will take the user to the respective game page depending on the difficulty they had chosen.
- Clicking the "Home" button will take the user from the victory modal to the Home page.
- Clicking the "Reset Leader Board" button will alert the user that all saved scores will be lost. 
    - Clicking "cancel" will take the user back to the Leader Board modal. 
    - Clicking "ok" will take the user to the Home page and reset the Leader Board. 

# Functions

## EmailJS

- Ensure that when the user submits the query form, from the Kick Off modal, a message to confirm whether or not the message has been sent appears. 
- Ensure once the form has been submitted that the form clears its content further indicating to the user that a message has been sent. 

## Shuffling Cards

- Ensure the game cards are immediately shuffled once the page has loaded, by using a random order, so cards to not appear in the same position everytime the page is re-loaded.
- Ensure that all the cards are shuffled dependant on which difficulty is selected by the user.  

## Audio 
- Ensure when audio is on (mute icon should be showing) background music will play for the length of the game. 
- Ensure when audio is off (volume up icon should be showing) that no sound-effects / background music will play.


## Flipping cards

- Ensure by clicking the cards once will turn the card over to show the cards front face. 
- Ensure that then clicking the same card again, before clicking another card, does not flip the card back over to show the back face image. 
- Ensure when audio is on (mute icon should be showing) that everytime a card is flipped a flip sound plays. 
- Ensure when audio is off (volume up icon should be showing) that everytime a card is flipped there should be no sound effects. 

## Matching cards

- Ensure when two cards match they cannot then be clicked again to flip the cards back. 
- Ensure when two cards do not match they should flip back to the back face image after a one second interval.
- Ensure when audio is on (mute icon should be showing) that everytime two cards match a match sound plays. 
- Ensure when audio is off (volume up icon should be showing) that everytime two cards match there should be no sound effects.


## Timer

- Ensure the timer begins once the user has clicked the first card to flip, and the "Moves" counter is equal to one. 
- Ensure the timer is set according to the difficulty level selected: 
    - Amateur: 60 seconds
    - Professional: 80 seconds
    - Legend: 100 seconds
- Ensure the timer ends once the user has matched all the cards correctly. 
- Ensure the timer ends if the user has not matched all the cards correctly within the timeframe, dependant on difficulty. 

## Moves Counter

- Ensure when the user clicks on a card the "Moves" counter increments by one. 
- Ensure if the user clicks on the same card more than once the "Moves" counter does not increment for each additional click. 

## Victory

- Ensure once the user has correctly matched all the cards the Victory modal appears. 
- Ensure when audio is on (mute icon should be showing) that background music will stop and a victory sound plays when the user has matched all the cards. 
- Ensure when audio is off (volume up icon should be showing) that a victory sound does not play when the user has matched all the cards.
- Ensure the "Time Remaining" is displaying as the start time minus the amount of time the user has taken to complete the game. 
- Ensure the "Total Moves" is displaying as the amount of moves the user has made to complete the game. 
- Ensure the correct number of stars are showing and the "Score" is showing as the sum of: "Time Remaining" + "points". "Points" and stars are calculated by: 
    - Amateur
        - If the moves made is less than or equal to 30: points = 80, stars = 5
        - If the moves made is less than or equal to 35: points = 60, stars = 4
        - If the moves made is less than or equal to 40: points = 40, stars = 3
        - If the moves made is less than or equal to 45: points = 20, stars = 2
        - Anything above 45: points = 0, stars = 1
    - Professional
        - If the moves made is less than or equal to 35: points = 80, stars = 5
        - If the moves made is less than or equal to 40: points = 60, stars = 4
        - If the moves made is less than or equal to 45: points = 40, stars = 3
        - If the moves made is less than or equal to 50: points = 20, stars = 2
        - Anything above 50: points = 0, stars = 1
    - Professional
        - If the moves made is less than or equal to 50: points = 80, stars = 5
        - If the moves made is less than or equal to 55: points = 60, stars = 4
        - If the moves made is less than or equal to 60: points = 40, stars = 3
        - If the moves made is less than or equal to 65: points = 20, stars = 2
        - Anything above 65: points = 0, stars = 1




## Saving High Scores

## Reset the Leader Board

## Game Over




