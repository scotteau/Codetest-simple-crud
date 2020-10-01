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
    <p-paginator [rows]="pageSize" [totalRecords]="this.data?.length" (onPageChange)="paginate($event)">
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

  paginatorState: PaginateEvent = {
    first: 0, page: 0, pageCount: 0, rows: this.pageSize
  };

  constructor(private dataService: DataService) {
    this.sub = this.dataService.data$.subscribe((data) => {
      this.data = data;
      this.paginatedData = this.data.slice(0, this.pageSize);
    });
  }

  ngOnInit(): void {
  }

  handleDeletion(id: number) {
    this.data = this.data.filter((item) => item.post.id !== id);
    this.paginatedData = this.data.slice(this.paginatorState.first, this.paginatorState.first + this.paginatorState.rows);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  paginate(event: PaginateEvent) {
    this.paginatedData = this.data.slice(event.first, event.first + event.rows);
    this.paginatorState = event;
  }
}
