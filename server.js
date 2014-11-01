var http = require('http');

// npm install ws
var ws_lib = require('ws');

// npm install swarm
var Swarm = require('swarm');

var Text = require('swarm/lib/Text');

// use file storage
var fileStorage = new Swarm.FileStorage('storage');

// create the server-side Swarm Host
var swarmHost = new Swarm.Host('swarm~nodejs', 0, fileStorage);

// create and start the HTTP server
var httpServer = http.createServer();
httpServer.listen(8000, function (err) {
    if (err) {
        console.warn('Can\'t start server. Error: ', err, err.stack);
        return;
    }
    console.log('Swarm server started at port 8000');
});

// start WebSocket server
var wsServer = new ws_lib.Server({ server: httpServer });

// accept incoming WebSockets connections
wsServer.on('connection', function (ws) {
		var temp = new Swarm.EinarosWSStream(ws);
		console.log(temp);
    swarmHost.accept(temp, { delay: 50 });
    console.log(swarmHost);
});