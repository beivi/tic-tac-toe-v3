


var boxArray = $("li.box").toArray();


function autoPlay(){

    var randSelect = Math.floor(Math.random() * 8) +1;
    var check = boxArray[randSelect];
    var moves2;
    if($(check).hasClass("filled") === false){
        $(check).addClass("box-filled-2 filled");
        $(check).css("background-image", "url(img/x.svg)");
        moves2 = $(".box").index(check);
        player2.push(moves2);
        gameOver();
    } else if (movesPerGame < 9) {
        autoPlay();
    }

}
