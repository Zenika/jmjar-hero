angular.module('app', []).controller('MainController', function ($scope) {
    let main = this;
    main.totalScore = 0;
    main.score = 0;
    main.highScores = [];

    try {
        if (localStorage.getItem("hightScore")) {
            main.highScores = JSON.parse(localStorage.getItem("hightScore"));
        }
    } catch (e) {
        //nop
    }

    main.songs = [{name: "Oxygen 4", path: "../music/OXYGENE_4_short.mp3"}];
    main.currentTitle = main.songs[0].path;
    main.onPlay = function () {
        if (main.currentPlayer && main.currentPlayer.length > 0) {
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
        if (main.currentPlayer && main.currentPlayer.length > 0) {
            main.isError = false;
        }
    };
    $scope.$on("timeline-completed", function (event, score) {
        main.highScores.push({
            player: main.currentPlayer,
            value: score
        });
        main.highScores = sortScores(main.highScores);
        localStorage.setItem("hightScore", JSON.stringify(main.highScores));
        totalScore = 0;
    });

    function sortScores(lastHighScore) {
        return _.sortBy(lastHighScore, function (player) {
            return player.value.score;
        }, false);
    }
});