import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-list',
  // templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  template: `
    <ng-container *ngIf="data$ | async as data">
      <p>{{data.length}}</p>
      <p>{{data[0] | json}}</p>
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
