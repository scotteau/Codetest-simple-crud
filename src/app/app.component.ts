import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="app">
      <header class="menu">
        <div class="content">
          <h1>Simple CRUD</h1>
        </div>
      </header>

      <div class="main">
        <app-list></app-list>
      </div>
    </div>

  `
})
export class AppComponent {
  title = 'sh-frontend';
}
