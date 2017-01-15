$(document).ready(function(){
    $("div.screen-start").show();
    $(this).css("background-image", "url(../mockups/tictactoe-01-start.png) no-repeat");
    $("div.board").hide();
    $("div.screen-win").hide();

});

$(".button").click(function(){
    $(".screen-start").hide();
    $(".board").show();
    $("#player1").addClass("active");
    $(".box").css("background-image", "none");
});

var winningNums = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

var player1 = [];
var player2 = [];

var movesPerGame = 0;


function toggleclass1(){
    $("#player1").removeClass("active");
    $("#player2").addClass("active");
}

function toggleclass2(){
    $("#player2").removeClass("active");
    $("#player1").addClass("active");
}

function gamePlay(){
    $(".box").click(function() {
        var moves1;
        var moves2;
        if($(this).hasClass("filled") === false){
            if($("#player1").hasClass("active")){
                $(this).addClass("box-filled-1");
                $(this).addClass("filled");

                moves1 = $(".box").index(this);
                player1.push(moves1);
                movesPerGame += 1;
                var classChange = window.setTimeout(toggleclass1, 100);

            }
            if($("#player2").hasClass("active")){
                $(this).addClass("box-filled-2");
                $(this).addClass("filled");

                moves2 = $(".box").index(this);
                player2.push(moves2);
                movesPerGame += 1;
                var classChange2 = window.setTimeout(toggleclass2, 100);
            }
        }
        gameOver();
    });

}

function gameOver(){
    var check1;
    var check2;
    var check3;
        for(var i = 0; i < winningNums.length; i++){
            check1 = winningNums[i][0];
            check2 = winningNums[i][1];
            check3 = winningNums[i][2];
            if($.inArray(check1, player1) !== -1 && $.inArray(check2, player1) !== -1 && $.inArray(check3, player1) !== -1){
                endGame();
                $(".screen-win").addClass("screen-win-one");

            } else if ($.inArray(check1, player2) !== -1 && $.inArray(check2, player2) !== -1 && $.inArray(check3, player2) !== -1){
                endGame();
                $(".screen-win").addClass("screen-win-two");
            }
        }
        if(movesPerGame >= 9){
            $(".board").hide();
            $(".screen-win").show();
            $(".screen-win").addClass("screen-win-tie");
            $("p.message").text("It's a Tie!");
        }
        $(".button").click(function(){
            newGame();
        });
}


function endGame(){
    $(".board").hide();
    $(".screen-win").show();
    $("p.message").text("Winner");

}

function newGame(){
    $(".screen-win").hide();
    $(".screen-start").hide();
    $(".board").show();
    $("#player2").addClass("active");
    $("#player1").removeClass("active");
    $(".box").css("background-image", "none");
    $(".box").removeClass("box-filled-1 box-filled-2 filled");
    movesPerGame = 0;
    player1 = [];
    player2 = [];
}

function rollOver(){
    $(".box").mouseenter(function(){
        if($(this).hasClass("filled") === false){
            if($("#player1").hasClass("active")){
                $(this).css("background-image", "url('img/o.svg')");
            } else if($("#player2").hasClass("active")){
                $(this).css("background-image", "url('img/x.svg')");
            }
        }
    });
    $(".box").mouseleave(function(){
        if($(this).hasClass("filled") === false){
            $(this).css("background-image", "none");
        }
    });
}


rollOver();
gamePlay();
