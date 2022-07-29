
var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true; //allows the player to draw whilst yourSum <= 21

window.onload = function() {
    buildDeck();
    shuffle();
    startGame();
}

function buildDeck() {
    let allSuits = ["C", "D", "H", "S"];
    let allNumbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


    // creating empty deck
    deck = [];

    // loop for storing all possible card combinations in the deck
    for (let suitsCount = 0; suitsCount < allSuits.length; suitsCount++) {
        for (let numbersCount = 0; numbersCount < allNumbers.length; numbersCount++) {
            deck.push(allNumbers[numbersCount] + "-" + allSuits[suitsCount]);
        }
    }

    // statement for ensuring that deck creating loop works
    // console.log(deck);
}

function shuffle() {
    for (let count = 0; count < deck.length; count++) {
        let shuffleCount = Math.floor(Math.random() * deck.length); // will yield a number between the number of cards available within the deck.

        // now we swap the cards between count and shuffleCount
        let temp = deck[count];
        deck[count] = deck[shuffleCount];
        deck[shuffleCount] = temp;
    }
    console.log(deck);
}

function startGame() {

    // takes first card and stores as the hidden card of the dealer
    hidden = deck.pop();

    // adds sum of the hidden card to  dealerSum 
    dealerSum += getValue(hidden);

    // checks to see the no. of aces and stores value accordingly
    dealerAceCount += checkAce(hidden);

    // for checking the value of the hidden card
    console.log(hidden);
    console.log(dealerSum);


    // this is where I'm facing an issue. The back.png is not showing even though the src is right.
    document.getElementById("hidden").src="./cards/BACK.png";

    // code for adding the second card to the dealer
    let newCardImage = document.createElement("img");
    let card = deck.pop();
    newCardImage.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealerHand").append(newCardImage);

    // loop for giving the player his/her first two cards
    for (let count = 0; count < 2; count++) {

        // code for adding a card
        let newCardImage = document.createElement("img");
        let card = deck.pop();
        newCardImage.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("yourHand").append(newCardImage);
    }
    
    // value for checking the sum of the user
    //console.log(yourSum);

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    
}

function getValue(card) {
    let cardData = card.split("-") //returns an array containing the number, and then the suit.
    let number = cardData[0];

    if (isNaN(number)) {
        if (number == "A") {
            return 11;
        }
        return 10;
    }

    return parseInt(number);
}

function getSuit(card) {
    let cardData = card.split("-") //returns an array containing the number, and then the suit.
    return cardData[1];
}


function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function hit() {
    if (canHit == false) {
        return;
    }

    let newCardImage = document.createElement("img");
        let card = deck.pop();
        newCardImage.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("yourHand").append(newCardImage);
        

    // console.log(yourSum);
    
    
    if (decreaseAceValue(yourSum, yourAceCount) > 21) {
        canHit = false;
        document.getElementById("hit").style.visibility = "hidden"
    }    
    
}

function decreaseAceValue(yourSum, yourAceValue) {
    while (yourSum > 21 && yourAceValue > 0) {
        yourSum -= 10;
        yourAceCount -= 1; 
        
    }

    return yourSum;
}


function stay() {

    // This is where my error is. The back card should change to the card image stored in hidden - which is not happening for some reason.
    document.getElementById('hidden').src = ('./cards/' + hidden + '.png');


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

    dealerSum = decreaseAceValue(dealerSum, dealerAceCount);
    yourSum = decreaseAceValue(yourSum, yourAceCount);

    canHit = false;

    let outputMessage = "";

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


    document.getElementById("dealerCount").innerHTML = dealerSum;
    document.getElementById("yourCount").innerHTML = yourSum;
    document.getElementById("outcome").innerHTML = message;
}