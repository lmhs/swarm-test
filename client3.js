window.onload = function() {
	var Swarm = require('swarm');
	var Mouse = require('./Mouse.js');
	var Text = require('swarm/lib/Text');

	var textArea = document.getElementById('text');

	function listenText() {
		textArea.value = text.text;
	}

	textArea.oninput = function() {
		text.set(this.value);
	}

	// 1. create local Host
	var swarmHost = new Swarm.Host('90');

	// 2. connect to your server
	swarmHost.connect('ws://80.240.136.40:8000');

	// 3.a. create an object
	var someMouse = new Mouse();
	// OR swarmHost.get('/Mouse');
	// OR new Mouse({x:1, y:2});

	// 4.a. a locally created object may be touched immediately
	// someMouse.set({x:1,y:2});

	// 3.b. This object is global (we supply a certain id) so we
	// may need to wait for its state to arrive from the server
	var mickey = new Mouse('Mickey');
	window.text = new Text('Text1');

	text.on('init', listenText);

	text.on(function(spec, val, source) {
		console.log('****************START EVENT********************');
		console.log('event: ', spec.op(), val);
		console.log('****************TEXT********************');
	  console.log(text);
	  console.log('****************SOURCE********************');
	  console.log(source);
	  listenText();
	})
}

// // 4.b. ...wait for the state to arrive
// mickey.on('init', function () {
//     // ...so we may touch it finally.
//     mickey.set({x: 8, y: 8});
// });

// // 5. let's subscribe to the object's change events
// mickey.on(function (spec, val, source) {
//     // this will be triggered by every state change, be it
//     // local or remote
//     console.log('event: ', spec.op(), val);
//     console.log(mickey);
//     // outputs:
//     // set {x:3, y:4}
// });