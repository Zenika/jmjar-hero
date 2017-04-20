var robot = require("robotjs");

var SerialPort = require("serialport");
var serialPort = new SerialPort("/dev/ttyACM0", {
   baudrate: 9600,
   dataBits: 8, // this is the default for Arduino serial communication
   parity: 'none', // this is the default for Arduino serial communication
   stopBits: 1, // this is the default for Arduino serial communication
   flowControl: false, // this is the default for Arduino serial communication 
   parser: SerialPort.parsers.readline('\n')
});
   
var keys = ["q","s","d","f","g","h"] 

serialPort.on("open", function () {
   serialPort.on('data', function(data) {
     //console.log('data received: ' + data);
     //console.log(keys[(parseInt(data) - 5)]);
     if ((parseInt(data) >= 5) && (parseInt(data) <= 10)) {
         robot.keyTap(keys[(parseInt(data) - 5)]);
     }
   });
});

