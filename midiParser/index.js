const midiFileParser = require('midi-file-parser');
const fs = require('fs');


//<config> for JM Oxygene4
const fileName = 'Oxygene4.mid';
const leadTrack = 1;
const file = fs.readFileSync('Oxygene4.mid', 'binary');
const forcedBPM = 121;
const firstNoteAt = 9500 - 700;
const duration = 111541.0;
//</config>


const midi = midiFileParser(file);

//extract BPM (get 120 but other tools 125 ???)
const ticksPerBeat = forcedBPM || midi.header.ticksPerBeat;

//extract tempo used to calculate deltaTime in ms
let tempo = 0;
midi.tracks[0].forEach(function (info) {
    if (info.subtype == 'setTempo') {
        tempo = info.microsecondsPerBeat;
    }
});

//Convert deltaTime from last event to delayInMsFromStart
let importedNotes = [];
let delayInMsFromStart = 0;
midi.tracks[leadTrack].forEach(function (info) {
    delayInMsFromStart += deltaTimeToMS(info.deltaTime, tempo, ticksPerBeat);
    if (info.subtype === 'noteOn') {
        importedNotes.push({delay: delayInMsFromStart, noteNumber: info.noteNumber});
    }
});

importedNotes = importedNotes.filter(function (note) {
    return note.delay < duration;
});

//display stats on note occurency
let stats = {};
let noteList = [];
importedNotes.forEach(function (note) {
    if (!stats[note.noteNumber]) {
        stats[note.noteNumber] = 1;
        noteList.push(note.noteNumber);
    } else {
        stats[note.noteNumber]++;
    }
});
console.log("note frequency");
console.log(stats);


importedNotes.forEach(function (note) {
    note.delay = note.delay - (7000 + firstNoteAt);
});

console.log("notes ------------------------------------------");
console.log(importedNotes);
fs.writeFileSync(fileName + '.js', 'window.song =' + JSON.stringify({
        notes: noteList.sort(),
        stream: importedNotes
    }) + ';');

//from https://www.gamedev.net/topic/535653-convert-midi-deltatime-to-milliseconds/
function deltaTimeToMS(deltaTime, tempo, ticksPerBeat) {
    return deltaTime * (1000.0 * (60.0 / ((60000000 / tempo) * ticksPerBeat)))
}


/**
 {
  "deltaTime": 5390,
  "channel": 0,
  "type": "channel",
  "noteNumber": 72,
  "velocity": 127,
  "subtype": "noteOn"
}
 **/
