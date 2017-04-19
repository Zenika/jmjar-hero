(function () {
    let akaiMpd;
    // Check if the Web MIDI API is supported by the browser
    if (navigator.requestMIDIAccess) {
        
        // Try to connect to the MIDI interface.
        WebMidi.enable(function (err) {

            if (err) {
                console.log("WebMidi could not be enabled.", err);
            } else {
                console.log("WebMidi enabled!");
                console.log('Inputs', WebMidi.inputs);
                console.log('Outputs', WebMidi.outputs);
                initInput();
            }
        
        });

    } else {
        console.log("Web MIDI API not supported!");
    }

    function initInput() {
        akaiMpd = WebMidi.getInputByName('Akai MPD18');
        akaiMpd.addListener('noteon', 'all', (e) => {
            const event = new CustomEvent('akaievent', {'detail': e.note.number});
            document.dispatchEvent(event);
        });
    }

    
})()