// various functions for the card deck

// initializes the deck
var deck = [];

// creates a new deck of 52 cards
function newDeck() {
    var suit = ["spade", "heart", "club", "diamond"];
    var face = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    var cardCounter = 0;

    for (var i = 0; i < suit.length; i++) {
        for (var j = 0; j < face.length; j++) {
            var card = {
                suit: suit[i],
                face: face[j]
            }
            deck[cardCounter] = card;
            cardCounter++;
        }
    }
}

// function that takes the card to delete as a perameter and deletes the card from the deck
function deleteCard(num) {
    var newdeck = [];
    for (let i = 0; i < deck.length; i++) {
        if (i == num) {
            continue;
        }
        else {
            newdeck.push(deck[i]);
        }
    }
    deck = newdeck;
}

// functions takes the max numbers in the deck as a parameter and returns a random card from the deck
function drawRandomCard(max) {
    var cardNum = Math.floor(Math.random() * max);
    deleteCard(cardNum);
    return deck[cardNum];
}

// draws the card from the top of the deck
function draw() {
    var card = deck[0];
    deleteCard(0);
    return card;
}