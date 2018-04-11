
// Declare card symbols
let cards = ["diamond", "diamond", "paper-plane-o", "paper-plane-o", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];

// Create array to hold opened cards
let openCard = [];
//Decalaring move variables
let moves = 0;
let counter = document.querySelector(".moves");
let matchFound = 0;
let startGame = false;
//Declaring star variable
let stars =$(".fa-star");

var starRating = document.querySelector(".stars").innerHTML;


 // declare modal

let modal = $('#modal');
// define stars list
let starsList = $('.stars li')
// close icon for modal
let close = $(".close");
//define game end
let gameEnd = $('.popup');
//define play playAgain
let againButton = $('#play-again');



// Shuffle cards (function from http://stackoverflow.com/a/2450976)
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

// Create each card's HTMl
function createCard() {
  let cardList = shuffle(cards);
  cardList.forEach(function(card) {
    $(".deck").append('<li><i class="card fa fa-' + card + '"></i></li>');
  })
}
function SettingTimer() {
  if (moves==0) {
  timer.innerHTML = "0 mins 0 secs ";
}
}
// Logic to find matching cards

function findMatch() {
  // Show cards on click
  $(".card").on("click", function() {
    if ($(this).hasClass("open show")) { return; }
    $(this).toggleClass("open show");
    openCard.push($(this));
    startGame = true;
   // Check if classlist matches call matsched function
    if (openCard.length === 2) {
      if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
      matched();
      }
      //else call unmatched function
      else {
    unmatched();
      }
    }
  updateMoves();
  })
 }
//if the cards do match, lock the cards in the open position
function matched() {
  openCard[0][0].classList.add("match");
  openCard[1][0].classList.add("match");
  $(openCard[0]).off('click');
  $(openCard[1]).off('click');
  matchFound += 1;
  moves++;
  removeOpenCards();
  findWinner();
}

// if the cards do not match, remove the cards from the list and hide the card's symbol
function unmatched() {
  // If classes don't match, add "unmatched" class
  openCard[0][0].classList.add("unmatched");
  openCard[1][0].classList.add("unmatched");
  //disable clicking a third card
  $(".card").addClass("disabled")
  // Set timeout to remove classes
  setTimeout(removeClasses, 700);
  // Reset openCard.length to 0
  setTimeout(removeOpenCards, 700);
  moves++;

}


// Reset openCard.length to 0
function removeOpenCards() {
  openCard = [];
}

// Remove all classes except "match"
function removeClasses() {
  $(".card").removeClass("show open unmatched disabled");
  removeOpenCards();
}

// Disable clicks
function disableClick() {
 openCard.forEach(function (card) {
   card.off("click");
  })
}

// Set  Timer
let second = 0, minute = 0;
let timer = document.querySelector(".timer");
let interval;


function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
    },1000);
}
// @description count player's moves

function updateMoves(){
    counter.innerHTML = moves;
    // Set starRating
     if (moves > 8 && moves < 12){
         for( i= 0; i < 3; i++){
             if(i > 1){
                 stars[i].style.visibility = "collapse";
             }
         }
     }
     else if (moves > 13){
         for( i= 0; i < 3; i++){
             if(i > 0){
                 stars[i].style.visibility = "collapse";
             }
         }
     }
 }


// congratulations when all cards match, show final score
  function findWinner(){
    if (matchFound ===8) {
    gameEnd.addClass('show');
    finalTime = timer.innerHTML;
      document.getElementById("totalMoves").innerHTML = moves;
      document.getElementById("starRating").innerHTML = starRating;
      document.getElementById("totalTime").innerHTML = finalTime;
    playAgain();
    xButton();
  }
}

  function playAgain(){
    $("#play-again").on("click", function() {
      location.reload()
    });
};

function xButton(){
  $(".close").on("click", function() {
    location.reload()
  });
};

// Call functions
shuffle(cards);
createCard();
findMatch();
startTimer();


// Function to restart the game on icon click
function restartGame() {
  $("#restart").on("click", function() {
      location.reload()
  });
  }

restartGame();





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
