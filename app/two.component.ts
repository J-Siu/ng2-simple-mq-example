import {Component, OnInit} from '@angular/core';
import {SimpleMQ} from 'ng2-simple-mq';

@Component({
	'selector': 'two-component',
	'template': `
		<h3>{{title}}</h3>
		<div>Receive from queue 'two' : {{msg}}</div>
		<div>Receive from queue 'broadcast' : {{broadcastMsg}}</div>`
})
export class TwoComponent implements OnInit {
	title = 'Component Two';
	msg;
	broadcastMsg;
	constructor(private smq: SimpleMQ) { }
	ngOnInit() {
		this.smq.subscribe('two', e => this.receiveMsg(e));
		this.smq.subscribe('broadcast', e => this.receiveBroadcast(e));
	}

	receiveMsg(m) {
		console.log('2:' + m);
		this.msg = m;
	}

	receiveBroadcast(m) {
		console.log('2bc:' + m);
		this.broadcastMsg = m;
	}
}
