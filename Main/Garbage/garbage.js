// create a new instance of a deck
newDeck();
window.onload = function() {
    var id = "card-"
    for (let i = 0; i <= 19; i++) {
        var currCard = document.getElementById(id + i);
        var img = document.createElement("img");
        img.setAttribute("src", "../images/E-Back.png");
        img.setAttribute("class", "card");

        currCard.appendChild(img);
    }
}

var hand;



function setHand() {
    var drawnCard = draw();
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

function getCardImage(card) {
    var suit = card.suit;
    var face = card.face;
    let file = "../images/"+suit+"-"+face+".png";

    return file;
}
