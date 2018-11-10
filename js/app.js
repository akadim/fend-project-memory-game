/*
 * Create a list that holds all of your cards
 */
let cardList= ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'leaf', 'bicycle', 'bomb', 'cube','diamond', 'paper-plane-o', 'anchor', 'bolt', 'leaf', 'bicycle', 'bomb', 'cube'];

/**
 * Number of moves
 */
 let numberOfMoves = 0;

/**
 * Number of stars
 */
 let numberOfStars = 3; 

 /**
  * Number of the cards on the deck
  */
 const numberOfCards = 16;

 /**
  * for registering the Star time of the game
  */
 let startTime = new Date();

 let startTimeInterval = null;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Update the number of the Displayed Stars 
 */
function updateStars(numberOfStars) {
     
     // Creating the stars container object
	let stars = document.querySelector('.stars');

    stars.innerHTML = '';

    for(let i=1; i <= numberOfStars; i++) {
  	   let starItem = document.createElement('li');
       let starContent = document.createElement('i');
       starContent.classList.add('fa', 'fa-star');
       starItem.appendChild(starContent);
       stars.appendChild(starItem); 
    }
}

function updateMoves(numberOfMoves) {
	document.querySelector('.moves').innerHTML = numberOfMoves;
}

function startTheGame() {

	 // Shuffling the cards
	 cardList = shuffle(cardList);

	 clearInterval(startTimeInterval);
     
     // Initializing the timer
     startTime = new Date();
	 startTimeInterval = displayTimer(startTime);
     
     // Initiliazing the number of stars & moves
	 updateStars(3);
	 updateMoves(0);

     // displaying the decks
	 displayCards(cardList);
}

function timeDiff(startDate, endDate) {
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes + (seconds <= 9 ? "0" : "") + seconds;
}

function displayTimer(startTime) {
     var timerInterval = setInterval(function(){
         document.querySelector('.timer').innerHTML = timeDiff(startTime, new Date());
     }, 1000);

     return timerInterval;
}

function timeDiff(startDate, endDate) {
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes + ':' +  (seconds <= 9 ? "0" : "") + seconds;
}

/**
 * Show the Result Modal
 */
function showResults(numberOfMoves, numberOfStars) {
	document.querySelector('.modal-wrapper').classList.remove('is-hidden');
	document.querySelector('.time-difference').innerHTML = timeDiff(startTime, new Date());
	document.querySelector('.display_num_moves').innerHTML = numberOfMoves;
    document.querySelector('.display_num_stars').innerHTML = numberOfStars;
}


function showCard (element) {
       if(!element.classList.contains('match')) {
       	  element.classList.add('open', 'show');

	       // Get the number of the shown cards
	       let shownCards = document.querySelectorAll('.show');

	       let matchedCards = null;
	       
	       if(shownCards.length === 2) {
	       	   numberOfMoves += 1;
	           let firstShownCardClass = shownCards[0].firstElementChild.className;
	           let firstShowCardContent = firstShownCardClass.substring(firstShownCardClass.indexOf('fa-') + 3, firstShownCardClass.length + 1);

	           let secondShownCardClass = shownCards[1].firstElementChild.className;
	           let secondShownCardContent = secondShownCardClass.substring(secondShownCardClass.indexOf('fa-') + 3, secondShownCardClass.length + 1);

	           if(firstShowCardContent === secondShownCardContent) {
	           	  shownCards.forEach((shownCard) => {
	           	  	   shownCard.classList.remove('open', 'show');
	           	  	   shownCard.classList.add('animated', 'bounceIn', 'match');

	           	  	   matchedCards = document.querySelectorAll('.match');
	                   
	                   if(matchedCards.length === numberOfCards) {
			           	   showResults(numberOfMoves, numberOfStars);
			           }

	           	  });
	           }
	           else {

	              if(numberOfMoves % 5 === 0 && numberOfStars > 1) {
	                   numberOfStars -= 1;
	                   updateStars(numberOfStars);
	              }

	           	  shownCards.forEach((shownCard) => {
	           	  	   shownCard.classList.add('animated', 'shake', 'notmatch');

	           	  	   setTimeout(function(currentCard) {
	                      shownCard.classList.remove('open', 'show', 'animated', 'shake', 'notmatch');
	                   }, 1000, shownCard);
	           	  });
	           }

	           updateMoves(numberOfMoves);

	       }
       }
       
 }



function displayCards(cardList) {
    
   /**
    * Creating the deck object
    */
    let deck = document.querySelector('.deck');

	/**
	 * Displaying the Shuffled cards
	 */
	let displayedCards = deck.querySelectorAll('.card');

    displayedCards.forEach( (displayedCard, index) => {

     /**
      * Initialize the card, make them hidden and without any status
      */
     displayedCard.classList.remove('open', 'show', 'match', 'notmatch');

     /**
      * Give the Flipping effect to the cards if they don't have it
      */
     if(!displayedCard.classList.contains('rotate') && !displayedCard.classList.contains('flipper')) {
     	  displayedCard.classList.add('rotate', 'flipper');
     }
     
	 displayedCard.firstElementChild.className = "";
     displayedCard.firstElementChild.classList.add('fa','fa-'+cardList[index]);

     displayedCard.addEventListener('click', function(evt){
            showCard(this);
     });
});
}

// Starting the Game
startTheGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


document.querySelector('.restart').addEventListener('click', function(){
	 startTheGame();
	 startTime = new Date();
});

document.querySelector('#restart_game_btn').addEventListener('click', function(){
	 startTheGame();
	 startTime = new Date();
	 document.querySelector('.modal-wrapper').classList.add('is-hidden'); 
});


