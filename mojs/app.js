angular.module('app', []).controller('MainController', function ($scope) {
    let main = this;
    main.highScores = [];
    main.scoreIncrement0 = "";
    main.scoreIncrement1 = "";
    main.scoreIncrement2 = "";

    try {
        if (localStorage.getItem("hightScore")) {
            main.highScores = JSON.parse(localStorage.getItem("hightScore"));
            main.highScores = main.highScores.sort(sortScores);
        }
    } catch (e) {
        //nop
    }

    main.theme = "./assets/music/jmjar_hero_theme.mp3";
    main.songs = [{name: "Oxygen 4", path: "../music/OXYGENE_4_short.mp3", parsed: "../midiParser/Oxygene4.mid.js"}];
    main.selectedSong = main.songs[0];

    main.currentName = "";
    main.isPlaying = false;
    main.isFinished = false;

    main.initGame = function () {
      main.isPlaying = true;
      main.currentPlayer = {score: 0, name: main.currentName, fails: 0, rank: main.highScores.length};
      main.highScores.push(main.currentPlayer);
      main.audio = new Audio(main.selectedSong.path);
      main.audio.addEventListener("play", function () {
          window.timeline.play();
      });

      main.audio.play();
    }

    main.addScript = function(path) {
      this.script = document.createElement("script");
      this.script.src = path;
      this.script.type = "text/javascript";
      document.body.appendChild(this.script);
    }

    main.playTheme = function () {
      main.audio = new Audio(main.theme);
      main.audio.currentTime = 9;
      main.audio.play();
      window.setTimeout(function () {
        main.audio.pause();
        main.audio.currentTime = 10;
        main.audio.play();
      }, 27900);
    }

    main.onPlay = function () {
      if (main.currentName && main.currentName.length > 0) {
          main.initGame();
      } else {
          main.isError = true;
      }
    };

    main.onReplay = function () {
      window.location.reload(); // FIXME I'm ugly

      window.timeline.stop();
      main.isFinished = false;
      main.isPlaying = false;
      main.audio.pause();
    }

    main.onNameChange = function () {
        if (main.currentName && main.currentName.length > 0) {
            main.isError = false;
        }
    };

    main.onKeyPressed = function ($event) {
        if ($event.key === "Enter") {
            main.onPlay();
            document.getElementById("harp").focus();
        }
    };

    $scope.$on("timeline-completed", function (event) {
        main.highScores = main.highScores.sort(sortScores);
        localStorage.setItem("hightScore", JSON.stringify(main.highScores));
        main.isFinished = true;
        main.playTheme();
    });

    $scope.$on("failed", function (event) {
        main.currentPlayer.fails++;
        updateRank();
    });

    let updateRank = _.debounce(_updateRank, 250);

    function _updateRank() {
        main.highScores = main.highScores.sort(sortScores);
        main.currentPlayer.rank = main.highScores.indexOf(main.currentPlayer);
    }

    function sortScores(player1, player2) {

        if (player1.score > player2.score) return -1;
        if (player1.score < player2.score) return 1;

        if (player1.fails < player2.fails) return -1;
        if (player1.fails > player2.fails) return 1;

    }

    $scope.$on("scope-updated", function (event, reactionTime) {
        let increment = computeScoreFromReactionTime(reactionTime);
        main.currentPlayer.score += increment;
        notifyScoreIncrement(increment);
        updateRank();
    });

    function computeScoreFromReactionTime(reactionTime) {
        let scoreToAdd = 0;
        if (reactionTime <= 50) {
            scoreToAdd = 120;
        } else if (reactionTime > 50 && reactionTime <= 80) {
            scoreToAdd = 100;
        } else if (reactionTime > 80 && reactionTime <= 110) {
            scoreToAdd = 80;
        } else if (reactionTime > 110 && reactionTime <= 140) {
            scoreToAdd = 60;
        } else if (reactionTime > 140 && reactionTime <= 170) {
            scoreToAdd = 40;
        } else if (reactionTime > 170 && reactionTime <= 200) {
            scoreToAdd = 20;
        }
        return scoreToAdd;
    }

    let counter = 0;

    function notifyScoreIncrement(increment) {
        let index = counter++ % 3;
        main["scoreIncrement" + index] = "+" + increment + "pt";
        scoreTab[index].play();
    }

    const scoreTab = [
        new mojs.Html({
            el: '#score0',
            duration: 300,
            opacity: {0: 1},
            scale: {0: 1},
        }).then({
            duration: 200,
            scale: {1: 1.1},
        }).then({
            duration: 100,
            opacity: {1: 0},
        }), new mojs.Html({
            el: '#score1',
            duration: 300,
            opacity: {0: 1},
            scale: {0: 1},
        }).then({
            duration: 200,
            scale: {1: 1.1},
        }).then({
            duration: 100,
            opacity: {1: 0},
        }), score2Html = new mojs.Html({
            el: '#score2',
            duration: 300,
            opacity: {0: 1},
            scale: {0: 1},
        }).then({
            duration: 200,
            scale: {1: 1.1},
        }).then({
            duration: 100,
            opacity: {1: 0},
        })];

});
