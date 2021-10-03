newDeck();

var playerHand, computerHand;
var playerDeck = [], computerDeck = [];
var playerWarDeck = [], computerWarDeck = [];
var playerWins, computerWins;

function getCards() {
    playerHand = playerDeck.pop();
    computerHand = computerDeck.pop();
    var playCard = document.getElementById("playerCard");
    var compCard = document.getElementById("computerCard");
    playCard.setAttribute("src", getCardImage(playerHand));
    compCard.setAttribute("src", getCardImage(computerHand));

    var playerNum = toNum(playerHand);
    var computerNum = toNum(computerHand);
    console.log("playerHand: "+playerHand.face);
    console.log("computerHand: "+computerHand.face);

    if(playerNum > computerNum) {
        playerDeck.unshift(playerHand);
        playerDeck.unshift(computerHand);
    }
    else if(playerNum < computerNum) {
        computerDeck.unshift(playerHand);
        computerDeck.unshift(computerHand);
    }
    else if(playerNum == computerNum) {
        document.getElementById("warButton").style.display = "inline-block";
        document.getElementById("dealButton").style.display = "none";
    }
    console.log(playerDeck);
    console.log(computerDeck);
}

function split() {
    for (let i = 0; i < (52/2); i++) {
        var playerCard = drawRandomCard();
        var computerCard = drawRandomCard();
        playerDeck.push(playerCard);
        computerDeck.push(computerCard);
    }
    console.log(playerDeck);
    console.log(computerDeck);
}

function war(card1, card2) {
    console.log(card1);
    playerWarDeck.push(card1);
    computerWarDeck.push(card2);
    console.log(playerWarDeck);
    console.log(computerWarDeck);

    playerHand = playerDeck.pop();
    computerHand = computerDeck.pop();

    var playerNum = toNum(playerHand);
    var computerNum = toNum(computerHand);
    var playCard = document.getElementById("playerCard");
    var compCard = document.getElementById("computerCard");

    playCard.setAttribute("src", getCardImage(playerHand));
    compCard.setAttribute("src", getCardImage(computerHand));

    if(playerNum > computerNum) {
        playerDeck.unshift(playerHand);
        playerDeck.unshift(playerWarDeck[0]);
        playerDeck.unshift(computerHand);
        playerDeck.unshift(computerWarDeck[0]);

        document.getElementById("warButton").style.display = "none";
        document.getElementById("dealButton").style.display = "inline-block";
    }
    else if(playerNum < computerNum) {
        computerDeck.unshift(playerHand);
        computerDeck.unshift(computerHand);

        document.getElementById("warButton").style.display = "none";
        document.getElementById("dealButton").style.display = "inline-block";
    }
}

function toNum(card){
    var num;
    switch(card.face) {
        case "A":
            num = 14;
        break;
        case "K":
            num = 13;
        break;
        case "Q":
            num = 12;
        break;
        case "J":
            num = 11;
        break;
        case 2:
            num = 2;
        break;
        case 3:
            num = 3;
        break;
        case 4:
            num = 4;
        break;
        case 5:
            num = 5;
        break;
        case 6:
            num = 6;
        break;
        case 7:
            num = 7;
        break;
        case 8:
            num = 8;
        break;
        case 9:
            num = 9;
        break;
        case 10:
            num = 10;
        break;
    }
    return num;
}

function getCardImage(card) {
    var suit = card.suit;
    var face = card.face;
    let file = "../images/"+suit+"-"+face+".png";

    return file;
}