var imageBox;
var backBox;
var currentCard;
var currentCardValue;
var cardBackPicker;

var playerHardHandTotal = 0;
var playerSoftHandTotal = 0;
var playerAceTotal;
var playerCardCounter = 0;

var dealerHardHandTotal = 0;
var dealerSoftHandTotal = 0;
var dealerAceTotal;
var dealerCardCounter = 0;

function buttonRNG() {
    var buttonRNG = Math.floor(Math.random() * 2);
    if (buttonRNG === 0) {
        buttonPicker = "1";
    } else if (buttonRNG === 1) {
        buttonPicker = "2";
    }
}

buttonRNG();
document.getElementById("hit").src = "../Images/Hit" + buttonPicker + ".png";
buttonRNG();
document.getElementById("stand").src = "../Images/Stand" + buttonPicker + ".png";

function createNewCardPlayer() {
    var suit = currentCard.suit;
    var face = currentCard.face;
    currentCardValue = currentCard.face;

    imageBox = document.createElement("img");
    imageBox.src = "../../images/" + suit + "-" + face + ".png";
    imageBox.alt = suit + "-" + face;
    // imageBox.id = "playerCard" + playerCardCounter;
}

function createNewCardDealer() {
    var suit = currentCard.suit;
    var face = currentCard.face;
    currentCardValue = currentCard.face;

    imageBox = document.createElement("img");
    imageBox.src = "../../images/" + suit + "-" + face + ".png";
    imageBox.alt = suit + "-" + face;
    imageBox.className = "dealerCardFace";
    imageBox.hidden = true;
}

function createNewBackDealer() {
    var cardBackRNG = Math.floor(Math.random() * 3);
    if(cardBackRNG === 0) {
        cardBackPicker = "C";
    } else if(cardBackRNG === 1) {
        cardBackPicker = "D";
    } else if(cardBackRNG === 2) {
        cardBackPicker = "E";
    }

    backBox = document.createElement("img");
    backBox.src = "../../images/" + cardBackPicker + "-" + "Back.png";
    imageBox.alt = cardBackPicker + "-Back";
    backBox.className = "dealerCardBack";
}

function hit() {
    playerCardCounter++;
    currentCard = drawRandomCard();
    createNewCardPlayer();
    document.getElementById("playerCards").appendChild(imageBox);

    if(currentCardValue === "A") {
        playerSoftHandTotal += 11;
        if(playerSoftHandTotal > 21) {
            playerSoftHandTotal -= 10;
        }
        playerHardHandTotal += 1;
    } else if(currentCardValue === "J" || currentCardValue === "Q" || currentCardValue === "K") {
        playerSoftHandTotal += 10;
        playerHardHandTotal += 10;
    } else {
        playerSoftHandTotal += currentCardValue;
        playerHardHandTotal += currentCardValue;
    }

    // Selects between Soft or Hard Hand for Aces
    playerAceTotal = playerSoftHandTotal;
    if(playerSoftHandTotal > 21) {
        playerAceTotal = playerHardHandTotal;
    }
    document.getElementById("playerTotal").innerHTML = "TOTAL: " + playerAceTotal;

    if(playerAceTotal === 21) {
        document.getElementById("hit").style.filter = "grayscale(100%)";
        document.getElementById("hit").style.cursor = "default";
        document.getElementById("hit").onclick = null;
    } else if(playerAceTotal > 21) {
        document.getElementById("hit").style.filter = "grayscale(100%)";
        document.getElementById("hit").style.cursor = "default";
        document.getElementById("hit").onclick = null;
        document.getElementById("playerTotal").style.color = "red";
    }

    if(playerCardCounter === 6) {
        document.getElementById("hit").style.filter = "grayscale(100%)";
        document.getElementById("hit").style.cursor = "default";
        document.getElementById("hit").onclick = null;
        document.getElementById("hit").disabled = true;
    }

    // Runs until dealer's hand is 17 or more
    if(dealerAceTotal < 17) {
        dealerHit();
    }
}

function stand() {
    document.getElementById("hit").hidden = true;
    document.getElementById("stand").hidden = true;
    document.getElementById("menu").hidden = false;
    document.getElementById("restart").hidden = false;
    
    // Runs until dealer's hand is 17 or more
    while(dealerAceTotal < 17) {
        dealerHit();
    }

    for (var i = 0; i < dealerCardCounter; i++) {
        document.getElementsByClassName("dealerCardFace")[i].hidden = false;
        document.getElementsByClassName("dealerCardBack")[i].hidden = true;
    }

    console.log(dealerCardCounter);

    document.getElementById("dealerTotal").innerHTML = "TOTAL: " + dealerAceTotal;

    // Checks for Blackjack
    if(playerAceTotal === 21 && dealerAceTotal === 21) {
        document.getElementById("status").innerHTML = "DOUBLE 21: TIE";
    } else if(playerAceTotal === 21) {
        document.getElementById("status").innerHTML = "21: YOU WIN";
    } else if(dealerAceTotal === 21) {
        document.getElementById("status").innerHTML = "DEALER 21: YOU LOSE";

        // Checks for Charlie
    } else if(playerCardCounter === 6 && playerAceTotal <= 21 && dealerCardCounter === 6 && dealerAceTotal <= 21) {
        if(playerAceTotal === dealerAceTotal) {
            document.getElementById("status").innerHTML = "DOUBLE 6-CARD CHARLIE - YOU WIN";
        } else if(playerAceTotal > dealerAceTotal) {
            document.getElementById("status").innerHTML = "DOUBLE 6-CARD CHARLIE - YOU HAVE THE LARGER HAND: YOU WIN";
        } else if(dealerAceTotal > playerAceTotal) {
            document.getElementById("status").innerHTML = "DOUBLE 6-CARD CHARLIE - THE DEALER HAS THE LARGER HAND: YOU LOSE";
        }
    } else if(playerCardCounter === 6 && playerAceTotal <= 21) {
        document.getElementById("status").innerHTML = "6-CARD CHARLIE: YOU WIN";
    } else if(dealerCardCounter === 6 && dealerAceTotal <= 21) {
        document.getElementById("status").innerHTML = "DEALER 6-CARD CHARLIE: YOU LOSE";

    } else if(playerAceTotal > 21 && dealerAceTotal > 21) {
        document.getElementById("status").innerHTML = "BUST: TIE";

        // Checks if user busted
    } else if(playerAceTotal > 21) {
        document.getElementById("status").innerHTML = "BUST: YOU LOSE";

        // Checks if dealer busted
    } else if(dealerAceTotal > 21) {
        document.getElementById("status").innerHTML = "DEALER BUST: YOU WIN";

        // Checks for victor
    } else if(playerAceTotal > dealerAceTotal) {
        document.getElementById("status").innerHTML = "YOU WIN";
    } else if(playerAceTotal < dealerAceTotal) {
        document.getElementById("status").innerHTML = "YOU LOSE";
    } else {
        document.getElementById("status").innerHTML = "IT'S A TIE";
    }

    document.getElementById("dealerTotal").innerHTML = "TOTAL: " + dealerAceTotal;

    if(dealerAceTotal > 21) {
        document.getElementById("dealerTotal").style.color = "red";
    }
}

function dealerHit() {
    dealerCardCounter++;
    currentCard = drawRandomCard();
    createNewCardDealer();
    createNewBackDealer();
    document.getElementById("dealerCards").appendChild(imageBox);
    document.getElementById("dealerCards").appendChild(backBox);

    if(currentCardValue === "A") {
        dealerSoftHandTotal += 11;
        if(dealerSoftHandTotal > 21) {
            dealerSoftHandTotal -= 10;
        }
        dealerHardHandTotal += 1;
    } else if(currentCardValue === "J" || currentCardValue === "Q" || currentCardValue === "K") {
        dealerSoftHandTotal += 10;
        dealerHardHandTotal += 10;
    } else {
        dealerSoftHandTotal += currentCardValue;
        dealerHardHandTotal += currentCardValue;
    }

    // Selects between Soft or Hard Hand for Aces
    dealerAceTotal = dealerSoftHandTotal;
    if(dealerSoftHandTotal > 21) {
        dealerAceTotal = dealerHardHandTotal;
    }

    document.getElementById("dealerTotal").innerHTML = "TOTAL: ???";
}

function playerStartingHand() {
    hit();
    hit();
}

function dealerStartingHand() {
    dealerHit();
    dealerHit();
}

function startGame() {
    newDeck();
    playerStartingHand();
    dealerStartingHand();
}

startGame();