angular.module('app', []).controller('MainController', function () {
    let main = this;
    main.totalScore = 0;
    main.score = 0;
    main.highScores = [
        {player: "martin", value: "20000"},
        {player: "martin", value: "20000"},
        {player: "martin", value: "20000"},
        {player: "martin", value: "20000"},
        {player: "martin", value: "20000"},
        {player: "martin", value: "20000"},
        {player: "martin", value: "20000"},
        {player: "martin", value: "200000000"},
        {player: "martin", value: "20000"}
    ];
    main.songs = [{name: "Oxygen 4", path: "../music/OXYGENE_4_short.mp3"}];
    main.currentTitle = main.songs[0].path;
    main.onPlay = function () {
        var audio = new Audio(main.currentTitle);
        audio.addEventListener("play", function () {
            window.timeline.play();
        });
        audio.play();
    }
});