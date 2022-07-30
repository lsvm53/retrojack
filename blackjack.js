
var dealerSum = 0; // the variable that stores the count of the dealer

var yourSum = 0; // the variable that stores the count of the player

var dealerAceCount = 0; // the variable that stores the number of aces that the dealer has

var yourAceCount = 0; // the variable that stores the number of aces that the player has

var hidden; /* the variable that stores the first card pulled out of the deck. This card is given to the dealer and is hidden. It is 
               only shown when the player presses the stay button */

var deck; // the variable which stores all the deck of cards.

var canHit = true; //allows the player to draw whilst yourSum <= 21

var hiddenCardImage = document.createElement("img"); // variable that creates an img element for storing the back card img
hiddenCardImage.src = "./cards/BACK.png"; //statement for setting the hiddenCardimg element to the right source code




// This is everything that happens on load
window.onload = function() {

    buildDeck(); // this function builds the deck of cards and stores in the deck variable

    shuffle(); // this function shuffled the deck array

    startGame(); // this function starts the game
}



// This function builds a deck of cards using the suits and numbers and it stores all the possible cards into an array.
function buildDeck() {

    let allSuits = ["C", "D", "H", "S"]; // array containing all posssible suits in a deck

    let allNumbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]; // array containing all possible numbers in a deck

    // creating the deck variable used for storing the deck
    deck = [];

    // loop for storing all possible card combinations in the deck
    // the first loop runs through the suits array 
    for (let suitsCount = 0; suitsCount < allSuits.length; suitsCount++) {
        //the second loop runs through the numbers array
        for (let numbersCount = 0; numbersCount < allNumbers.length; numbersCount++) {
        
            deck.push(allNumbers[numbersCount] + "-" + allSuits[suitsCount]); /* this statement adds a string, representing a card,
                                                                                 by listing the number and then the suit. for example
                                                                                 4-C represents the 4 of clubs*/

        }
    }

    // statement for ensuring that deck creating loop works
    // console.log(deck);
}



// This function shuffles the deck array.
function shuffle() {

    //a for loop iterating throughout the deck array. This is to shuffle each index with another random index.
    for (let count = 0; count < deck.length; count++) {

        let shuffleCount = Math.floor(Math.random() * deck.length); // shuffleCount gives a random index value within the deck array

        // now we swap the cards between count and shuffleCount using a temperary variable.
        let temp = deck[count];
        deck[count] = deck[shuffleCount];
        deck[shuffleCount] = temp;

    }

    // the statement below is to ensure that the deck is shuffled
    // console.log(deck);
}


// this function calls contains the logic for the start of the game, and the event listeners for the hit and stay functions. 
function startGame() {

    /* pops the first card from the deck and stores it in hidden. This is the hidden card (second card) of the dealer 
       that is shown when the player clicks the stay button*/
    hidden = deck.pop();

    // obtains the value of the hidden card and adds it to the count of the dealer
    dealerSum += getValue(hidden);

    // checks to see the no. of aces and stores value accordingly
    dealerAceCount += checkAce(hidden);

    // for checking the value of the hidden card
    console.log(hidden);
    console.log(dealerSum);


    // this is where I'm facing an issue. The back.png is not showing even though the src is right.
    //document.getElementById("hidden").src="./cards/BACK.png";
    document.getElementById("dealerHand").append(hiddenCardImage);

    // code for adding the second card to the dealer. This is the card of the dealer that people see
    let newCardImage = document.createElement("img"); //creates new img element 
    let card = deck.pop(); // pops a random card from the shuffled deck
    newCardImage.src = "./cards/" + card + ".png"; //sets the source code of the random card
    dealerSum += getValue(card); //adds value of random card to the dealer's count
    dealerAceCount += checkAce(card); // checks to see if card is ace and change dealerAceCount value accordingly
    document.getElementById("dealerHand").append(newCardImage); //adds img of new card to the dealerHand div

    // loop for giving the player his/her first two cards
    for (let count = 0; count < 2; count++) {

        // code for adding a card. Same logic as above but twice for the player.
        let newCardImage = document.createElement("img");
        let card = deck.pop();
        newCardImage.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("yourHand").append(newCardImage); // new cards are displayed on the yourHand div
    }
    
    // value for checking the sum of the user
    //console.log(yourSum);

    document.getElementById("hit").addEventListener("click", hit); //event listener for the hit button, for adding another card
    document.getElementById("stay").addEventListener("click", stay); //event listener for the stay button, for ending the round.
    
}

// this function returns the value that a given card is worth, takes a string variable named card as input
function getValue(card) {

    let cardData = card.split("-") //returns an array containing the number, and then the suit.

    let number = cardData[0]; /*created a variable called number and set it to the first value of the array, which is the 
                                number of the card*/

    // an if statement to see whether number is a face card or not
    if (isNaN(number)) {
        // if it is an ace, set the number to 11
        if (number == "A") {
            return 11;
        }
        // any other face card is set to 10, as per the rules
        return 10;
    }

    // if it is a number, then the number is whatever number the card shows.
    return parseInt(number);
}

// this function returns the suit of the card, takes a string variable named card as input
function getSuit(card) {

    let cardData = card.split("-") //returns an array containing the number, and then the suit.

    return cardData[1]; // returns the second value of the array, which is the suit

}

// this function checks to see if the card drawn is an Ace or not. if it is, it returns 1 which is added to the ace count variable
function checkAce(card) {

    /* the card is a string containing 3 letters, hence, it is an array with a length of 3.
       the if statement takes the first letter, which is the value of the card, and checks to
       see if it is an ace or not.*/
    if (card[0] == "A") {

        return 1; // if the value is A, then the function return 1
    }

    return 0; // otherwise 0, indicating it is not an ace.
}

// this function is triggered when the player presses the hit button.
function hit() {

    // if statement checking whether the user can hit. It is set to false when player count exceeds 21.
    if (canHit == false) {
        return;
    }

    
    let newCardImage = document.createElement("img"); // creates an img element in the "yourHand" div of the html

    let card = deck.pop(); // pops a card out of the shuffled deck

    newCardImage.src = "./cards/" + card + ".png"; // sets the source code of the img div in "yourHand" to the image of the corresponding card

    yourSum += getValue(card); // gets value of the card and adds it to player's sum.

    yourAceCount += checkAce(card); // checks to see if card is an ace, if it is, adds 1 to the ace count of the player

    document.getElementById("yourHand").append(newCardImage); // adds the card image to the player's html div
        

    // console.log(yourSum);
    
    
    if (decreaseAceValue(yourSum, yourAceCount) > 21) {
        canHit = false;
        document.getElementById("hit").style.visibility = "hidden"
    }    
    
}

//this function is for decreasing the value of your ace if player count exceeds 21. returns new count of the player/dealer after ace value change.
function decreaseAceValue(yourSum, yourAceValue) {

    /**
     * the while loops runs until the number of aces in your deck left reach 0, and your sum exceeds 21.
     */
    while (yourSum > 21 && yourAceValue > 0) {
        yourSum -= 10; // reduces value of ace from 11 to 1

        yourAceCount -= 1; //reduces the number of aces you have in your deck.
        
    }

    return yourSum;
}


// this function is triggered when the stay button is pressed. This is to show the dealer's hand
function stay() {

    // changes the img of the hidden card from the back to the front
    hiddenCardImage.src = ('./cards/' + hidden + '.png');

    // statement for checking whether the hidden card is stored or not
    console.log(hidden);

    // loop for giving the dealer cards until he reaches 17
    while (dealerSum < 17) {
        let newCardImage = document.createElement("img");
        let card = deck.pop();
        newCardImage.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealerHand").append(newCardImage);
    }

    dealerSum = decreaseAceValue(dealerSum, dealerAceCount); // to check to see if the dealer has any aces left, returns final count

    yourSum = decreaseAceValue(yourSum, yourAceCount); // to check to see if you have any aces left, returns final count

    canHit = false; // set canHit to false

    let outputMessage = ""; //variable storing output message

    // code determining win and loss conditions
    if (yourSum > 21) {
        message = "you lose!";
    } else if (dealerSum > 21) {
        message = "You win!!!"
        // add to player's score
    } else if (yourSum == dealerSum) {
        message = "Tie!!"
    } else {
        if (yourSum <= dealerSum) {
            message = "you lose!"
        } else {
            message = "you win!!!"
            // add to player's score
        }
    }


    // statements outputing player score, dealer score, and final game result. 
    document.getElementById("dealerCount").innerHTML = dealerSum;
    document.getElementById("yourCount").innerHTML = yourSum;
    document.getElementById("outcome").innerHTML = message;
}