// create a new instance of a deck and creates a variable to store the active card
newDeck();
var hand;
var activePlayer = 1;
var discard = [];
var currVal;

// loads the card back images to the game board and sets the hand
window.onload = function() {
    var id = "card-"
    for (let i = 0; i <= 19; i++) {
        var randCard = drawRandomCard();
        var currCard = document.getElementById(id + i);
        var img = document.createElement("img");
        img.setAttribute("src", "../images/E-Back.png");
        img.setAttribute("class", "card");
        currCard.setAttribute("data-cardImg", getCardImage(randCard));
        currCard.setAttribute("data-card", currCard);
        currCard.setAttribute("data-flipped", false);
        currCard.appendChild(img);
    }
    setHand();
}

// function that sets the active card
function setHand(card) {
    if (card == undefined) {
        var drawnCard = drawRandomCard();
        var playerHand = document.getElementById("player-hand");
        var card = document.createElement("img");
        card.setAttribute("src", getCardImage(drawnCard));
        card.setAttribute("class", "card");
        
        if (playerHand.firstChild) {
            playerHand.removeChild(playerHand.firstChild);
        }

        playerHand.appendChild(card);
        console.log(drawnCard);

        hand = drawnCard;
    }
    else {
        hand = card;
    }
}

function getCardImage(card) {
    var suit = card.suit;
    var face = card.face;
    let file = "../images/"+suit+"-"+face+".png";

    return file;
}

function setActivePlayer() {
    var player1 = document.getElementsByClassName("player1");
    var player2 = document.getElementsByClassName("player2");
    if (activePlayer == 1) {
        activePlayer = 2;
        for (let i = 0; i < player1.length; i++) {
            player1[i].style.display = "none";
            player2[i].style.display = "grid";
        }
    }
    else {
        activePlayer = 1;
        for (let i = 0; i < player1.length; i++) {
            player1[i].style.display = "grid";
            player2[i].style.display = "none";
        }
    }
    console.log(activePlayer);
}

function flipCard(elem) {
    var newImg = document.getElementById("player-hand");
    var hiddenImg = elem.getAttribute("data-cardImg");
    var flipped = elem.getAttribute("data-flipped");
    var img = elem.lastChild;
    if (flipped != true) {
        img.setAttribute("src", newImg.firstChild.getAttribute("src"));
        newImg.firstChild.setAttribute("src", hiddenImg);
        flipped.setAttribute("data-flipped", true);
    }
    else{
        img.setAttribute("src", newImg.firstChild.getAttribute("src"));
        newImg.firstChild.setAttribute("src", img.getAttribute("src"));
    }
}

function nextTurn() {
    setActivePlayer();
    discard.push(hand);
    setHand();
}
