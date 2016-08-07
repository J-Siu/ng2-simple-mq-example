import {Component} from '@angular/core';
import {SimpleMQ} from 'ng2-simple-mq';

import {OneComponent} from './one.component';
import {TwoComponent} from './two.component';

@Component({
	'selector': 'app-component',
	'template': `
		<h3>{{title}}</h3>
		<div>Send message to component one <input [(ngModel)]="msgOne"><button (click)="sendToOne()">Send</button></div>
		<div>Send message to component two <input [(ngModel)]="msgTwo"><button (click)="sendToTwo()">Send</button></div>
		<div>Broadcast message <input [(ngModel)]="msgBroadcast"><button (click)="broadcast()">Broadcast</button></div>
		<one-component></one-component>
		<two-component></two-component>
		`,
	'providers': [SimpleMQ],
	'directives': [
		OneComponent,
		TwoComponent]
})
export class AppComponent {
	title = 'Angular2 Simple Component MQ Example';
	msgOne: string;
	msgTwo: string;
	msgBroadcast: string;

	constructor(private cmq: SimpleMQ) { }

	sendToOne() {
		// Publish to queue name 'one'
		this.cmq.publish('one', this.msgOne);
	}
	sendToTwo() {
		// Publish to queue name 'two'
		this.cmq.publish('two', this.msgTwo);
	}
	broadcast() {
		// Publish to queue name 'broadcast'
		this.cmq.publish('broadcast', this.msgBroadcast);
	}
}