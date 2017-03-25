const midiFileParser = require('midi-file-parser');
const fs = require('fs');


//Config for JM Oxygene4
const fileName = 'Oxygene4.mid';
const noteToKeep = [72, 67, 63, 67, 60, 72];
const leadTrack = 1;
const file = fs.readFileSync('Oxygene4.mid', 'binary');


const midi = midiFileParser(file);

//extract BPM (get 120 but other tools 125 ???)
const ticksPerBeat = midi.header.ticksPerBeat;

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
midi.tracks[1].forEach(function (info) {
    delayInMsFromStart += deltaTimeToMS(info.deltaTime, tempo, ticksPerBeat);
    if (info.subtype === 'noteOn') {
        importedNotes.push({delay: delayInMsFromStart, noteNumber: info.noteNumber});
    }
});

//display stats on note occurency
let stats = {};
importedNotes.forEach(function (note) {
    if (!stats[note.noteNumber]) {
        stats[note.noteNumber] = 1;
    } else {
        stats[note.noteNumber]++;
    }
});
console.log("note frequency");
console.log(stats);

//keep only 6 notes :
importedNotes = importedNotes.filter(function (note) {
    return noteToKeep.indexOf(note.noteNumber) !== -1;
});
console.log("notes ------------------------------------------");
console.log(importedNotes);
fs.writeFileSync(fileName + '.js', 'const song =' + JSON.stringify({notes: noteToKeep, stream: importedNotes}) + ';');

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