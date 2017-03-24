string(160);
string(100);
string(40);
string(-20);
string(-80);
string(-140);
target();

let failedNotes = 0;
let failedNoteX = -200;
let failedNoteY = -320;

var note = getNote(100, function (isOk) {
    if (isOk) {
        success(100, {[targetY]: targetY - 150});
    } else {
        failedNoteY = failedNoteY + noteRadius / 4;
        failure({100: failedNoteX}, {[targetY]: failedNoteY});
    }
});
note.play();
document.addEventListener('keydown', function (event) {
    note.triggerOk();
});


