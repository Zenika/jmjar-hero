(function () {

    function score(input) {
        const reactionTime = Math.abs(input.inputTime - input.perfectTime);
        let scoreLabel;
        let scoreToAdd = 0;
        if (reactionTime <= 100) {
            scoreLabel = '+120pts';
            scoreToAdd = 120;
        } else if (reactionTime > 100 && reactionTime <= 250) {
            scoreLabel = '+100pts';
            scoreToAdd = 100;
        } else if (reactionTime > 250 && reactionTime <= 400) {
            scoreLabel = '+80pts';
            scoreToAdd = 80;
        } else if (reactionTime > 400 && reactionTime <= 550) {
            scoreLabel = '+60pts';
            scoreToAdd = 60;
        } else if (reactionTime > 550 && reactionTime <= 700) {
            scoreLabel = '+40pts';
            scoreToAdd = 40;
        } else if (reactionTime > 700 && reactionTime <= 850) {
            scoreLabel = '+20pts';
            scoreToAdd = 20;
        }
        let scope = angular.element(document.body).scope();
        scope.$apply(scope.$broadcast('scope-updated', scoreToAdd));
        displayScore(scoreLabel);
    }

    function displayScore(score) {
        const scoreDiv = document.getElementById('score');
        scoreDiv.innerText = score || '';
        const scoreHtml = new mojs.Html({
            el: '#score',
            duration: 300,
            opacity: {0: 1},
            scale: {0: 1},
        }).then({
            duration: 200,
            scale: {1: 1.1},
            onComplete: () => {
                scoreDiv.innerText = '';
            }
        }).play();
    }

    window.score = score;
})();
