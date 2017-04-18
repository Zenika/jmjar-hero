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

function noteFactory(channel, delay) {
    return getNote(channel, delay, function (input) {
        if (input.isOk) {
            success(channel.x, {[targetY]: targetY - 150});

            fireAngulerEvent('scope-updated', Math.abs(input.inputTime - input.perfectTime));
        } else {
            nbFail++;
            let failY = failedNoteY + (nbFail % 60.5) * (noteRadius / 4);
            let failX = failedNoteX + Math.ceil(nbFail / 60) * noteRadius * 2;
            failure({[channel.x]: failX}, {[(targetY - 150) ]: failY});
            fireAngulerEvent('failed');
        }
    });
}

window.timeline = new mojs.Timeline({
  onStart: () => {
      scope = angular.element(document.body).scope();
      window.Timer = Date.now();
  },
  onPlaybackStop: () => {
    this.start = false;
    this.clearTroll()
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

song.stream.forEach(function (note) {
    let channel = channels[song.notes.indexOf(note.noteNumber) % (channels.length)];
    window.timeline.add(noteFactory(channel, note.delay));
});

function fireAngulerEvent(name, args) {
    scope.$apply(scope.$broadcast(name, args));
}
