window.onload = function() {
	var login = prompt('Введите логин');
	var Swarm = require('swarm');
	var Text = require('swarm/lib/Text');
	var textArea = document.getElementById('text');
	var swarmHost = new Swarm.Host(login);

	window.text = new Text('TextArea2');

	function listenText() {
		textArea.value = text.text;
	}

	swarmHost.connect('ws://80.240.136.40:8000');

	textArea.oninput = function() {
		text.set(this.value);
	}

	text.on('init', listenText);

	text.on(function(spec, val, source) {

		console.log('****************START EVENT********************');
		console.log('event: ', spec.op(), val);
		console.log('****************TEXTAREA********************');
		console.log(text);
		console.log(swarmHost);
		listenText();
	})
}