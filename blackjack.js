
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
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    // for checking the value of the hidden card
    // console.log(hidden);
    // console.log(dealerSum);

    while (dealerSum < 17) {
        let newCardImage = document.createElement("img");
        let card = deck.pop();
        newCardImage.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealerHand").append(newCardImage);
    }

    console.log(dealerSum);
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

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}