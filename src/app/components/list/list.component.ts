import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Item} from '../../models/interfaces';
import {Subscription} from 'rxjs';

interface PaginateEvent {
  first: number;
  page: number;
  pageCount: number;
  rows: number;
}

@Component({
  selector: 'app-list',
  // templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  template: `
    <p-paginator [rows]="pageSize" [totalRecords]="data?.length" (onPageChange)="paginate($event)">
    </p-paginator>
    <ul>
      <li *ngFor="let item of paginatedData">
        <p>{{item.post.id}}</p>
        <app-list-item [item]="item" (onDeleteItem)="handleDeletion($event)"></app-list-item>
      </li>
    </ul>

  `
})
export class ListComponent implements OnInit, OnDestroy {

  data: Item[];
  sub: Subscription;
  paginatedData: Item[];
  pageSize = 6;

  constructor(private dataService: DataService) {
    this.sub = this.dataService.data$.subscribe((data) => {
      this.data = data;
      this.paginatedData = this.data.slice(0, this.pageSize);
      console.log(this.paginatedData.length);
    });
  }

  ngOnInit(): void {
  }

  handleDeletion(id: number) {
    this.data = this.data.filter((item) => item.post.id !== id);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  paginate(event: PaginateEvent) {
    console.log(event);
    this.paginatedData = this.data.slice(event.first, event.first + event.rows);
  }
}
