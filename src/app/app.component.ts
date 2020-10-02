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

      <div class="error" *ngIf="errorMessage">
        <span><i class="material-icons">error_outline</i>{{errorMessage}}</span>
      </div>

      <ul class="intro">
        <li><i class="material-icons-outlined">info</i>
          <span>
          Click on title to edit it
          </span>
        </li>
        <li><i class="material-icons-outlined">info</i>
          <span>
          Hover & click delete icon to delete item
          </span>
        </li>
      </ul>

      <div class="main">
        <app-list (onError)="handleError($event)"></app-list>
      </div>
    </div>
  `
})
export class AppComponent {
  title = 'sh-frontend';
  errorMessage = '';

  handleError(error: string) {
    this.errorMessage = error;
  }
}
