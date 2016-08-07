import {Component, OnInit} from '@angular/core';
import {SimpleMQ} from 'ng2-simple-mq';

@Component({
	'selector': 'one-component',
	'template': `
		<h3>{{title}}</h3>
		<div>Receive from queue 'one' : {{msg}}</div>
		<div>Receive from queue 'broadcast' : {{broadcastMsg}}</div>`
})
export class OneComponent implements OnInit {
	title = 'Component One';
	msg;
	broadcastMsg;
	constructor(private smq: SimpleMQ) { }
	ngOnInit() {
		this.smq.subscribe('one', e => this.receiveMsg(e));
		this.smq.subscribe('broadcast', e => this.receiveBroadcast(e));
	}

	receiveMsg(m) {
		this.msg = m;
		console.log('1:' + this.msg);
	}

	receiveBroadcast(m) {
		this.broadcastMsg = m;
		console.log('1bc:' + this.broadcastMsg);
	}
}
