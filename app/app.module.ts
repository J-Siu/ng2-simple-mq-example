import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SimpleMQ } from 'ng2-simple-mq';

import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	declarations: [
		AppComponent
	],
	providers: [
		SimpleMQ
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }