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
    string(channel.x);
});
//Setup the target place : note goes to it
target();

// "score position"
let failedNoteX = -200;
let failedNoteY = -320;

function noteFactory(channel, delay) {
    return getNote(channel, delay, function (isOk) {
        if (isOk) {
            success(channel.x, {[targetY]: targetY - 150});
        } else {
            failedNoteY = failedNoteY + noteRadius / 4;
            failure({[channel.x]: failedNoteX}, {[targetY]: failedNoteY});
        }
    });
}

let timeline = new mojs.Timeline();
song.stream.forEach(function (note) {
    let channel = channels[song.notes.indexOf(note.noteNumber)];
    timeline.add(noteFactory(channel, note.delay));
});

let audioPlayer = document.getElementById("audiotrack");
audioPlayer.addEventListener("canplaythrough", function () {
    audioPlayer.play();
    timeline.play();
});