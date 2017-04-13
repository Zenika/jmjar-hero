angular.module('app', []).controller('MainController', function ($scope) {
    let main = this;
    main.highScores = [];

    try {
        if (localStorage.getItem("hightScore")) {
            main.highScores = JSON.parse(localStorage.getItem("hightScore"));
            main.highScores = main.highScores.sort(sortScores);
        }
    } catch (e) {
        //nop
    }

    main.songs = [{name: "Oxygen 4", path: "../music/OXYGENE_4_short.mp3"}];

    main.currentTitle = main.songs[0].path;
    main.currentName = "";

    main.onPlay = function () {
        if (main.currentName && main.currentName.length > 0) {
            main.currentPlayer = {score: 0, name: main.currentName, fails: 0, rank: main.highScores.length};
            main.highScores.push(main.currentPlayer);
            let audio = new Audio(main.currentTitle);
            audio.addEventListener("play", function () {
                window.timeline.play();
            });
            audio.play();
        } else {
            main.isError = true;
        }
    };

    main.onNameChange = function () {
        if (main.currentName && main.currentName.length > 0) {
            main.isError = false;
        }
    };

    $scope.$on("timeline-completed", function (event) {
        main.highScores = main.highScores.sort(sortScores);
        localStorage.setItem("hightScore", JSON.stringify(main.highScores));
    });

    $scope.$on("scope-updated", function (event, scoreToAdd) {
        main.currentPlayer.score += scoreToAdd;
        main.highScores = main.highScores.sort(sortScores);
        main.currentPlayer.rank = main.highScores.indexOf(main.currentPlayer);
    });

    function sortScores(player1, player2) {

        if (player1.score > player2.score) return -1;
        if (player1.score < player2.score) return 1;

        if (player1.fails < player2.fails) return -1;
        if (player1.fails > player2.fails) return 1;

    }
});