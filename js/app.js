

(+function(){

    'use strict'

//Load start screen
    $(document).ready(function(){
        $("div.screen-start").show();
        $(this).css("background-image", "url(../mockups/tictactoe-01-start.png) no-repeat");
        $("div.board").hide();
        $("div.screen-win").hide();
        $(".screen-start a.button").addClass("start");
        startScreenCss();
        startGame();


    });

//Debated whether to add to css file
//Decided to put in from JS

    function startScreenCss(){
        $(".start").css("margin-top", "150px");
        $(".start").before("<label id='label'>Player 1:</label><br><form><input type='text' id='name'></form>");
        $("#name").css({"margin-top": "30px", "width": "50%", "padding":".3em", "height": "2em", "border-radius": "4px", "border-style": "none","box-shadow":"0 2px 0 rgba(0, 0, 0, 0.1)"});
        $("#label").css({"margin-top": "15px", "font-size": "1.15em", "color": "#54D17A", "border-radius":"4px", "background": "#fff", "padding": "8px","box-shadow": "0 2px 0 rgba(0, 0, 0, 0.1)"});
        $(".screen-start h1").css("margin-bottom", "20px");


    }
//Same here

    function startGameCss(){
        $(".players").css({"outline": "2px solid #ccc", "padding-top":"1em", "padding-bottom":".75em"});
        $("#pName").css({"margin-left": "2.5%", "color": "#696969", "font-size":"1.75em","line-height":"0.7","margin-bottom":"25px"});
        $(".boxes").css("margin-top","25px");

    }


//Prompting for player to enter name
    var playerName;

    function startGame(){
        $(".start").click(function(){
            playerName = $("input").val();
            $("ul.boxes").before("<p id='pName'>" + playerName + "</p>");
            startGameCss();
            $(".screen-start").hide();
            $(".board").show();
            $("#player1").addClass("active");
            $(".box").css("background-image", "none");

        });
    }

//Winning combo numbers
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

//Empty arrays for player moves to check winning combos
    var player1 = [];
    var player2 = [];

//Moves per game set to zero
    var movesPerGame = 0;

//Checking so game tie isnt preemptive
    var hasGameEnded = false;

    var message;
//toggle active class
    function toggleclass1(){
        $("#player1").removeClass("active");
        $("#player2").addClass("active");
    }

    function toggleclass2(){
        $("#player2").removeClass("active");
        $("#player1").addClass("active");
    }

//Function for auto play
    function switchPlayers(){
        autoPlay();
        movesPerGame += 1;
        window.setTimeout(toggleclass2, 425);
    }

//Function for basic game play
    function gamePlay(){
        $(".box").click(function() {
            var moves1;

            if($(this).hasClass("filled") === false){
                if($("#player1").hasClass("active")){
                    $(this).addClass("box-filled-1");
                    $(this).addClass("filled");

                    moves1 = $(".box").index(this);
                    player1.push(moves1);
                    movesPerGame += 1;
                    window.setTimeout(toggleclass1, 100);
                    window.setTimeout(switchPlayers, 200);

                }

            }

            gameOver();
        });

    }


//Function to check game over
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
                    $("p.message").text(playerName + " Wins!");
                    hasGameEnded = true;

                } else if ($.inArray(check1, player2) !== -1 && $.inArray(check2, player2) !== -1 && $.inArray(check3, player2) !== -1){
                    endGame();
                    $(".screen-win").addClass("screen-win-two");
                    hasGameEnded = true;
                }

                else if (movesPerGame === 9 && hasGameEnded === false){
                    $(".board").hide();
                    $(".screen-win").show();
                    $(".screen-win").addClass("screen-win-tie");
                    $("p.message").text("It's a Tie!");
                }
            }
            $(".button").click(function(){
                newGame();
            });
    }

//Function for end game win screen
    function endGame(){
        $(".board").hide();
        $(".screen-win").show();

        $("p.message").text("Winner");

    }

//Function for new game from new game button
//Resets everything
    function newGame(){
        $(".screen-win").hide();
        $(".screen-start").hide();
        $(".board").show();
        $("#player1").addClass("active");
        $("#player2").removeClass("active");
        $(".box").css("background-image", "none");
        $(".box").removeClass("box-filled-1 box-filled-2 filled");
        $(".screen-win").removeClass("screen-win-one screen-win-two screen-win-tie");
        movesPerGame = 0;
        hasGameEnded = false;
        player1 = [];
        player2 = [];
    }

//Rollover function for player 1 since player 2 is the computer
    function rollOver(){
        $(".box").mouseenter(function(){
            if($(this).hasClass("filled") === false){
                if($("#player1").hasClass("active")){
                    $(this).css("background-image", "url('img/o.svg')");
                }

            }

        });
        $(".box").mouseleave(function(){
            if($(this).hasClass("filled") === false){
                $(this).css("background-image", "none");
            }
        });
    }

//Beginning of auto play program
    var boxArray = $("li.box").toArray();

    function autoPlay(){

        var randSelect = Math.floor(Math.random() * 9);
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


//Initiate functions that havent been called
    rollOver();
    gamePlay();
}());
