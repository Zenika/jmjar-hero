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

// "trollface position"
let failedNoteX = 220;
let failedNoteY = -320;
let nbFail = 0;
let scope;

let notesBychannels = []
let i = 6
while(i--) {
  const notes = song.notes
  notesBychannels[i] = song.stream.filter(note => {
    const index = notes.findIndex(n => n === note.noteNumber)
    return index % 6 === i
  })
}

window.timeline = new mojs.Timeline({
  onStart: () => {
      scope = angular.element(document.body).scope();
      const timelineTimer = Date.now();
      window.addEventListener('keydown', event => {
        const currentChannel = channels.findIndex(channel => channel.key === event.key)
        if(currentChannel !== -1) {
          const timing = Date.now() - timelineTimer - 3000
          const possibleNotes = notesBychannels[currentChannel].filter(
            note => !note.fired
          )
          .filter(
            note => note.delay < (timing + 800) && note.delay > timing
          )
          if (possibleNotes.length) {
            let theNote = possibleNotes[0]
            let closest = 1000
            possibleNotes.forEach(n => {
                if (closest > n.delay - (timing + 400)){
                  theNote = n
                  closest = n.delay - (timing + 400)
                }
            })
            const precision = theNote.delay - (timing + 400)
            theNote.fired = true
            if(Math.abs(precision) > 200) {
              nbFail++;
              let failY = failedNoteY + (nbFail % 60.5) * (noteRadius / 4);
              let failX = failedNoteX + Math.ceil(nbFail / 60) * noteRadius * 2;
              failure({[channels[currentChannel].x]: failX}, {[(targetY - 30) ]: failY});
              fireAngulerEvent('failed');
            } else {
              fireAngulerEvent('scope-updated', Math.abs(precision));
            }
          }
        }
        // success(channel.x, {[targetY]: targetY - 150});
      })
  },
  onPlaybackStop: () => {
    this.start = false;
    this.clearTroll()
    notesBychannels = notesBychannels.map(channel => channel.map(note => Object.assign({}, note, { fired: false })))
    console.log(notesBychannels)
  },
  onComplete: () => {
      fireAngulerEvent('timeline-completed', {fails: nbFail});
      this.clearTroll();
  }
});

this.clearTroll = () => {
  $(".troll").remove();
  nbFail = 0;
}

song.stream.forEach(function (_note) {
    const channelIndex = song.notes.indexOf(_note.noteNumber) % (channels.length)
    let channel = channels[channelIndex];
    window.timeline.add(getNote(channel, _note.delay, function (input) {
      const note = notesBychannels[channelIndex].find(n => n.delay === _note.delay)
      if(!note.fired) {
        note.fired = true
        nbFail++;
        let failY = failedNoteY + (nbFail % 60.5) * (noteRadius / 4);
        let failX = failedNoteX + Math.ceil(nbFail / 60) * noteRadius * 2;
        failure({[channel.x]: failX}, {[(targetY - 30) ]: failY});
        fireAngulerEvent('failed');
      }
    }));
});

function fireAngulerEvent(name, args) {
    scope.$apply(scope.$broadcast(name, args));
}
