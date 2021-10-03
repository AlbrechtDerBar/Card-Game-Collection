newCard();

function playFunction() {
    var x = document.getElementById("playButton");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    placeHolderCard();
}

function placeHolderCard() {
    var y = document.getElementById("playerDeckPlaceholder");
    y.style.display = "flex";
}

var player1Hand = "",
    player2Hand = "",
    player3Hand = "",
    player4Hand = "";

var player1Deck = [],
    player2Deck = [],
    player3Deck = [],
    player4Deck = [];

function split() {
    for (let i = 0; i < (52 / 4); i++) {
        var player1Card = drawRandomCard();
        var player2Card = drawRandomCard();
        var player3Card = drawRandomCard();
        var player4Card = drawRandomCard();
        player1Deck.push(player1Card);
        player2Deck.push(player2Card);
        player3Deck.push(player3Card);
        player4Deck.push(player4Card);
    }
    console.log(playerDeck);
    console.log(computerDeck);
}