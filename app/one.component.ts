import {Component, OnInit} from '@angular/core';
import {SimpleMQ} from 'ng2-simple-mq';

@Component({
	'selector': 'one-component',
	'template': `
		<h3>{{title}}</h3>
		<div>Send message to component two <input [(ngModel)]="msgTwo"><button (click)="sendToTwo()">Send</button></div>
		<div>Broadcast message <input [(ngModel)]="msgBroadcast"><button (click)="broadcast()">Broadcast</button></div>
		<div>Receive from queue 'one' : {{msg}}</div>
		<div>Receive from queue 'broadcast' : {{broadcastMsg}}</div>`
})
export class OneComponent implements OnInit {
	title = 'Component One';
	msg;
	msgTwo;
	msgBroadcast;
	broadcastMsg;
	constructor(private smq: SimpleMQ) { }
	ngOnInit() {
		this.smq.subscribe('one', e => this.receiveMsg(e));
		this.smq.subscribe('broadcast', e => this.receiveBroadcast(e));
	}
	sendToTwo() {
		// Publish to queue name 'two'
		this.smq.publish('two', this.msgTwo);
	}
	broadcast() {
		// Publish to queue name 'broadcast'
		this.smq.publish('broadcast', this.msgBroadcast);
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
