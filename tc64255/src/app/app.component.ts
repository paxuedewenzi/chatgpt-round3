import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gpt-round3';
  // get metadata from json file
  metadata = require('../data/metadata.json');
  result: any;

  submitform(event: any) {
    this.result = JSON.stringify(event);
  }
}
