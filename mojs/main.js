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

/* test loot
 let timeline = new mojs.Timeline();
 for (let index = 0; index < 10; index++) {
 let channel = channels[_.random(0, channels.length - 1)];
 timeline.add(noteFactory(channel, _.random(500, 5000)));
 }
 timeline.play();
 */

let timeline = new mojs.Timeline();
song.stream.forEach(function (note) {
    let channel = channels[song.notes.indexOf(note.noteNumber)];
    timeline.add(noteFactory(channel, note.delay));
});
timeline.play();
