import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: { class: 'rootPage' },
})
export class AppComponent {
  title = 'Client';
}
