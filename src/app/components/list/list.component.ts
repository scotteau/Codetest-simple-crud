import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Item} from '../../models/interfaces';
import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SubSink} from 'subsink';

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

    <div class="controls">
      <p-paginator [rows]="pageSize" [totalRecords]="this.data?.length" (onPageChange)="paginate($event)">
      </p-paginator>
    </div>

    <ul>
      <li *ngFor="let item of paginatedData">
        <app-list-item [item]="item" (onDeleteItem)="handleDeletion($event)"></app-list-item>
      </li>
    </ul>


  `
})
export class ListComponent implements OnInit, OnDestroy {
  @Output() onError = new EventEmitter<string>();

  data: Item[];
  sub = new SubSink();
  paginatedData: Item[];
  pageSize = 10;

  paginatorState: PaginateEvent = {
    first: 0, page: 0, pageCount: 0, rows: this.pageSize
  };

  constructor(private dataService: DataService) {
    this.sub.sink = this.dataService.data$.pipe(
      catchError((err) => {
        console.log(err);
        console.log(err.message);
        this.onError.emit(err);
        return of([]);
      })
    ).subscribe((data) => {
      this.data = data;
      this.doPagination();
    });
  }

  private doPagination() {
    this.paginatedData = this.data.slice(this.paginatorState.first, this.paginatorState.first + this.paginatorState.rows);
  }

  ngOnInit(): void {
  }

  handleDeletion(id: number) {
    this.data = this.data.filter((item) => item.post.id !== id);
    this.doPagination();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  paginate(event: PaginateEvent) {
    this.paginatorState = event;
    this.doPagination();
  }
}
