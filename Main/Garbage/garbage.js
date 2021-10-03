// create a new instance of a deck and creates a variable to store the active card
newDeck();
var hand;
var activePlayer = 1;
var playerField1 = [];
var playerField2 = [];
var discard = [];
var currVal;

// loads the card back images to the game board and sets the hand
window.onload = function() {
    var id = "card-"
    for (let i = 0; i <= 19; i++) {
        var randCard = drawRandomCard();
        if(i <= 9) {
            playerField1.push(randCard);
        }
        else {
            playerField2.push(randCard);
        }
        var currCard = document.getElementById(id + i);
        var img = document.createElement("img");
        img.setAttribute("src", "../images/E-Back.png");
        img.setAttribute("class", "card");
        currCard.setAttribute("data-cardImg", getCardImage(randCard));
        currCard.setAttribute("data-flipped", "false");
        currCard.appendChild(img);
    }
    setHand();
    console.log(playerField1);
    console.log(playerField2);
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
    var num = elem.getAttribute("data-cardNum");
    var tmpHand = hand;
    var testNum;

    switch(hand.face) {
        case "A":
            testNum = 0;
        break;
        case "Q":
            testNum = 5;
        break;
        case "J":
            testNum = num;
        break;
        case 2:
            testNum = 1;
        break;
        case 3:
            testNum = 2;
        break;
        case 4:
            testNum = 3;
        break;
        case 5:
            testNum = 4;
        break;
        case 6:
            testNum = 5;
        break;
        case 7:
            testNum = 6;
        break;
        case 8:
            testNum = 7;
        break;
        case 9:
            testNum = 8;
        break;
        case 10:
            testNum = 9;
        break;
    }

    if(testNum != num) {
        console.log("wrong number");
        return;
    }

    if(activePlayer == 1) {
        hand = playerField1[num];
        playerField1[num] = tmpHand;
        console.log(playerField1);
        console.log(hand);
    }
    else if(activePlayer == 2){
        hand = playerField2[num];
        playerField2[num] = tmpHand;
        console.log(playerField2);
        console.log(hand);
    }
    var img = elem.lastChild;
    if (flipped != "true") {
        img.setAttribute("src", newImg.firstChild.getAttribute("src"));
        newImg.firstChild.setAttribute("src", hiddenImg);
        elem.setAttribute("data-flipped", "true");
    }
    else{
        var newHand = img.getAttribute("src");
        var newfield = newImg.lastChild.getAttribute("src");
        img.setAttribute("src", newfield);
        newImg.lastChild.setAttribute("src", newHand);
    }
}

function nextTurn() {
    var discardPile = document.getElementById("discard");
    var card = document.createElement("img");

    setActivePlayer();
    if(discardPile.firstChild) {
        discardPile.removeChild(discardPile.firstChild);
    }

    discard.unshift(hand);
    card.setAttribute("src", getCardImage(hand));
    card.setAttribute("class", "card");
    discardPile.appendChild(card);

    setHand();
    if(discard.length > 1){
        discard.pop();
    }
    console.log(discard);
}

function selectDiscard(elem) {
    var handImg = document.getElementById("player-hand").lastChild;
    var discImg = elem.lastChild;
    var tmpHand = hand;

    hand = discard.pop();
    discard.push(tmpHand);

    handImg.setAttribute("src", getCardImage(hand));
    discImg.setAttribute("src", getCardImage(discard[0]));

    console.log(hand);
    console.log(discard);
}

function load() {
    location.reload();
    return false;
}