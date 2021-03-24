<h1 align="center">World of Rugby Memory Game</h1>

View the repository in GitHub [here](https://github.com/Tawnygoody/MS2-World-of-Rugby)

View the live project [here]()

# Contents

- [User Experience (UX)](#user-experience-(ux))
    - [Strategy](#strategy)
    - [Scope](#scope)
    - [Structure](#structure)
    - [Skeleton](#skeleton)
    - [Surface](#surface)
- [Technologies Used](#technologies-used)
    - [Languages Used](#languages-used)
    - [Frameworks, Libraries & Programmes used](#frameworks-libraries-and-programmes-used)
- [Testing](#testing)
    - [W3C Validator](#w3c-validator)
    - [Testing User Stories](#testing-user-stories)
    - [Full Testing](#full-testing)
    - [Further Testing](#further-testing)
    - [Solved Bugs](#solved-bugs)
    - [Known Bugs](#known-bugs)
    - [Lighthouse](#lighthouse)
- [Deployment](#deployment)
    - [GitHub Pages](#github-pages)
    - [Forking the GitHub Repository](#forking-the-github-repository)
    - [Making a Local Clone](#making-a-local-clone)
- [Credits](#credits)
    - [Code](#code)
    - [Content](#content)
    - [Media](#media)
    - [Acknowledgements](#acknowledgement)


# User Experience (UX)

## Strategy

The main requirement of this project was to create a fun, easy to play, interactive memory game 
that could be enjoyed by everyone. As the content of the game is suitable for all age groups, the target
audience is substantial. The game may appeal more to sports fans, and more specifically rugby fans. 

### User Stories
- #### Business Goals
    - The game needs to be easily accessible and straightforward to use, through the use of readily 
    available instructions. 
    - The game needs to engaging from the first visit to encourage the user to play the game. 
    - The game needs to appeal to all ages to maximise the target audience.
    - Scrolling whilst playing the game on different screen sizes should be minimal, as this will
    detract from the user experience. 

- #### User Goals
    - I want to know what the website offers, and easily navigate through the site. 
    - I want to be able to return to the home page at the click of a button. 
    - I want to be able to challenge myself with different difficulty settings. 
    - I want to have the option of turning audio on and off. 
    - I want a game that is simple to play so I do not to spend a length of time learning the rules. 
    - I want easy controls for the game, so I can play the game effortlessly. 
    - I want to see a scoring system so I have a score to beat. 
    - I want to be able to contact the business with any queries I may have. 

## Scope

Based on the strategic goals established, I will incorporate a phased approach prioritising the most feasible
concepts. 

The first phase will be aimed at creating a minimum viable product (MVP):

- ### Phase 1
    - A home page, with a stimulating image, logo, and button to open a modal.
    - Modal to include, instructions, contact information, and option to begin a new game. 
    - A game page with the layout of the cards all with the same image, until the game begins and user 
    flips cards. 
    - A timer on the game page, which counts down when the game has begun. 
    - A scoring system should be displayed to reflect the users performance based on the number of moves made.
    - A congratulations / comiserations modal should show time, score and the option to play again. 

Once the MVP has been established I would add to the user experience in phase 2:

- ### Phase 2
    - Include different levels of difficulty to challenge the user. 
    - Incorporate EmailJS API to receive emails from the user using a contact form.  
    - Include a leader board using local storage so a user can save their scores in the session, and compete against default
    scores that will already appear on the leader board. 

I would then implement back end technologies (knowledge not yet gained)

- ### Phase 3
    - Include a leader board that would save the scores to a database, so that users could compete against
    other users.

## Structure
- ### Design
    - #### Colour Scheme
        - The main colours for the website are Brown, and Rusty colours. These have been picked from the logo Image
        to compliment the website. White and Orange have been used for the text in places to increase color contrast and 
        allow easier readability. 
    - #### Typography
        - Quattrocento will be used for headings and titles and Radley will be used for the websites content. San-serif will 
        be used as a fallback, should there be an error with the imported fonts. These fonts are in-keeping with the websites
        logo. 
        - The text will be consistent accross all pages / modals. Most content can be centered as there are no large bodies of 
        text in the website. 
    - #### Imagery
        - Home page background is designed to catch the user's attention. This must be striking and directly 
        related to what the company offers. 
        - Game page background must be in-keeping with the game, but should not detract from the game cards or distract the user. 
        - All images must be of a sound enough quality, so they can scale according to different device sizes, without pixelating.

    
## Skeleton

## Surface
- ### Features
    - #### All Pages
        - Logo - The logo row will include an image of the websites logo, which slides down when the page has loaded.
        - Footer - The footer will contain links to the GitHub repository and Linkedin which will open in a separate tab. 
    - #### Home Page
        - Striking background image to engage the user. 
        - Kick Off button which triggers the World of Rugby Modal. 
    - #### World of Rugby Modal
        - Rules button which slides open the rules for the game when clicked, and hides them when clicked again. 
        - New Game button which takes the user to select their difficulty modal. 
        - Contact Us button which slides open the contact form when clicked, and hides the contact form when clicked again.
        Submitting the contact form once the fields have been completed, will trigger an EmailJS API and send an email to the
        developer.  
    - #### Difficulty Modal
        - 3 buttons for choosing a difficulty which will direct the user to that game page depending on their selection. 
        - "Back" button which will take the user back to the World of Rugby Modal. 
    - #### Game Pages
        - Kick Off overlay which is removed once the user has clicked anywhere on the screen, so the game can begin. 
        - Dependant on which selection the user makes the game page will display 16, 20, or 25 cards. The remaining features are the same. 
        - Audio button in the logo row which when clicked will allow sound effects. If the user clicks again the sound effects will stop. 
        - Game information row which displays the time remaining and the moves the user has made. 









# Media
Images 
- Home Page Background - [View](https://www.pixelstalk.net/free-new-zealand-all-black-rugby-hd-backgrounds/)
- Logo Rugby Ball - [View](https://www.modestvintageplayer.com/collections/mvp-leather-balls)
- Game page Background - [View](https://commons.wikimedia.org/wiki/File:Rugby_union_pitch.svg)
- Card Front Image - [View](https://nbcsportsgrouppressbox.com/2018/02/02/nbc-sports-group-begins-inaugural-season-of-natwest-6-nations-championship-rugby-coverage-this-weekend/)
- England Rugby Logo - [View](https://leadersinsport.com/company/england-rugby/attachment/logo-england-rugby/)
- Scottish Rugby Logo - [View](https://www.talkingrugbyunion.co.uk/scottish-rugby-are-you-backing-blue-/10165.htm)
- Japan Rugby Logo - [View](https://www.pngitem.com/middle/wTJbbJ_cherry-blossom-japan-rugby-hd-png-download/)
- Wales Rugby Logo - [View](https://www.pinterest.at/pin/736620082776008846/)
- France Rugby Logo - [View](https://www.news24.com/sport/Rugby/french-rugby-clubs-raise-funds-to-help-coronavirus-victims-carers-20200328)
- New Zealand Rugby Logo - [View](https://www.pinterest.it/pin/94646029638529210/)
- Australia Rugby Logo - [View](https://twitter.com/wallabies)
- Argentina Rugby Logo - [View](http://www.unioncordobesaderugby.com.ar/es/2018/09/concentracion-nacional-m20-en-cordoba/)
- Webb Ellis Cup - [View](https://www.amazon.co.uk/Rugby-Replica-Trophy-Presentation-rrp%C2%A3120/dp/B01CUF1FME)
- Takcled Player - [View](https://www.pinclipart.com/pindetail/iihoJmh_rugby-tackle-clipart-png-transparent-png/)
- Fiji Rugby Logo - [View](https://ar.pinterest.com/pin/846254586206851348/)
- Spain Rugby Logo - [View](https://www.pinterest.es/pin/728949889669378184/)
- Canada Rugby Logo - [View](http://torontorugby.ca/clubs/rugby-canada/)
- Georgia Rugby Logo - [View](https://www.florugby.com/collections/tag/georgia-rugby/article)

## Bugs 
- victory modal closes when clicking outside it meaning game wont reset. (https://stackoverflow.com/questions/16152073/prevent-bootstrap-modal-from-disappearing-when-clicking-outside-or-pressing-esca)
- gametype variable - help from tutor Stephen from code institute with code placement in terms of page loading.
- gametype variable - https://stackoverflow.com/questions/21265919/location-pathname-indexof-not-working-with-or