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
        if (main.currentPlayer.length > 0) {
            var audio = new Audio(main.currentTitle);
            audio.addEventListener("play", function () {
                window.timeline.play();
            });
            audio.play();
        }
    };
    $scope.$on("timeline-completed", function (event, score) {
        let lastHighScore = [];
        try {
            if (localStorage.getItem("hightScore")) {
                lastHighScore = JSON.parse(localStorage.getItem("hightScore"));
            }
        } catch (e) {
            //nop
        }
        lastHighScore.push({
            player: main.currentPlayer,
            value: score
        });
        lastHighScore = _.sortBy(lastHighScore, function (player) {
            return player.value;
        });
        main.highScores = lastHighScore;
        localStorage.setItem("hightScore", JSON.stringify(lastHighScore));
        totalScore = 0;
    });
});