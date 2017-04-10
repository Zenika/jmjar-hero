(function () {
    let totalScore = 0;

    function score(input) {
        const reactionTime = Math.abs(input.inputTime - input.perfectTime);
        let score;
        if (reactionTime <= 100) {
            score = '120pts';
            totalScore += 120;
        } else if (reactionTime > 100 && reactionTime <= 250) {
            score = '100pts';
            totalScore += 100;
        } else if (reactionTime > 250 && reactionTime <= 400) {
            score = '80pts';
            totalScore += 80;
        } else if (reactionTime > 400 && reactionTime <= 550) {
            score = '60pts';
            totalScore += 60;
        } else if (reactionTime > 550 && reactionTime <= 700) {
            score = '40pts';
            totalScore += 40;
        } else if (reactionTime > 700 && reactionTime <= 850) {
            score = '20pts';
            totalScore += 20;
        }

        displayScore(score);
    }

    function displayScore(score) {
        const scoreDiv = document.getElementById('score');
        scoreDiv.innerText = score || '';
        const scoreHtml = new mojs.Html({
            el: '#score',
            duration: 300,
            opacity: {0:1},
            scale: {0:1},
            y: 800,
            x: 600
        }).then({
            duration: 100,
            scale: {1:1.1},
            onComplete: () => {
                scoreDiv.innerText = '';
            }
        }).play();

        const totalScoreDiv = document.getElementById('totalScore');
        totalScoreDiv.innerText = totalScore;
    }

    window.score = score;
})();

