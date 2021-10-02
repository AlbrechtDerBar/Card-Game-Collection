// create a new instance of a deck
newDeck();
window.onload = function() {
    var id = "card-"
    for (let i = 0; i < 19; i++) {
        var currCard = document.getElementById(id + i);
    }
}

var hand;



function setHand() {
    var drawnCard = draw();
    var playerHand = document.getElementById("player-hand");
    var card = document.createTextNode(drawnCard.suit + " " + drawnCard.face);
    
    if (playerHand.firstChild) {
        playerHand.removeChild(playerHand.firstChild);
    }

    playerHand.appendChild(card);
    console.log(drawnCard);

    hand = drawnCard;
}
