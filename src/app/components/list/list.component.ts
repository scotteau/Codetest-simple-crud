import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Item} from '../../models/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list',
  // templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  template: `
    <ul>
      <li *ngFor="let item of data">
        <app-list-item [item]="item" (onDeleteItem)="handleDeletion($event)"></app-list-item>
      </li>
    </ul>

  `
})
export class ListComponent implements OnInit, OnDestroy {

  data: Item[];
  sub: Subscription;

  constructor(private dataService: DataService) {
    this.sub = this.dataService.data$.subscribe((data) => {
      this.data = data;
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
}
