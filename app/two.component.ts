import {Component, OnInit} from '@angular/core';
import {SimpleMQ} from 'ng2-simple-mq';

@Component({
	'selector': 'two-component',
	'template': `
		<h3>{{title}}</h3>
		<div>Send message to component one <input [(ngModel)]="msgOne"><button (click)="sendToOne()">Send</button></div>
		<div>Broadcast message <input [(ngModel)]="msgBroadcast"><button (click)="broadcast()">Broadcast</button></div>
		<div>Receive from queue 'two' : {{msg}}</div>
		<div>Receive from queue 'broadcast' : {{broadcastMsg}}</div>`
})
export class TwoComponent implements OnInit {
	title = 'Component Two';
	msg;
	msgOne;
	msgBroadcast;
	broadcastMsg;
	constructor(private smq: SimpleMQ) { }
	ngOnInit() {
		this.smq.subscribe('two', e => this.receiveMsg(e));
		this.smq.subscribe('broadcast', e => this.receiveBroadcast(e));
	}
	sendToOne() {
		// Publish to queue name 'one'
		this.smq.publish('one', this.msgOne);
	}
	broadcast() {
		// Publish to queue name 'broadcast'
		this.smq.publish('broadcast', this.msgBroadcast);
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
