window.harp = document.getElementById("harp");

let noteRadius = 30;
let topOrigin = -350;
let targetY = 290;

let channels = [
    {x: -140, key: 'q'},
    {x: -80, key: 's'},
    {x: -20, key: 'd'},
    {x: 40, key: 'f'},
    {x: 100, key: 'g'},
    {x: 160, key: 'h'}
];

//Setup 6 strings
_.forEach(channels, function (channel) {
    string(channel);
});
//Setup the target place : note goes to it
target();

// "score position"
let failedNoteX = 220;
let failedNoteY = -320;
let nbFail = 0;
function noteFactory(channel, delay) {
    return getNote(channel, delay, function (input) {
        if (input.isOk) {
            success(channel.x, {[targetY]: targetY - 150});
            score(input);
        } else {
            nbFail++;
            let failY = failedNoteY + (nbFail % 60.5) * (noteRadius / 4);
            let failX = failedNoteX + Math.ceil(nbFail / 60) * noteRadius * 2;
            failure({[channel.x]: failX}, {[(targetY - 150) ]: failY});
        }
    });
}

window.timeline = new mojs.Timeline({
    onStart: () => {
        window.Timer = Date.now();
    },
    onComplete: () => {
        let scope = angular.element(document.body).scope();
        scope.$apply(scope.$broadcast('timeline-completed', {score: totalScore, fails: nbFail}));
        nbFail = 0;
        totalScore = 0;
        $(".troll").remove();
    }
});

song.stream.forEach(function (note) {
    let channel = channels[song.notes.indexOf(note.noteNumber) % (channels.length)];
    timeline.add(noteFactory(channel, note.delay));
});