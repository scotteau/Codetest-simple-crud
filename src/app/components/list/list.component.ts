import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-list',
  // templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  template: `
    <ng-container *ngIf="data$ | async as data">
      <h1>{{data.length}} items</h1>
      <ul>
        <li *ngFor="let item of data">
          <app-list-item [item]="item"></app-list-item>
        </li>
      </ul>
    </ng-container>

  `
})
export class ListComponent implements OnInit {

  data$ = this.dataService.data$;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

}
