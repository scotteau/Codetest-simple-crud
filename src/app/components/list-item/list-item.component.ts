import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {Item} from '../../models/interfaces';

@Component({
  selector: 'app-list-item',
  // templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  template: `
    <div>
      <p>{{item.post.title}}</p>
      <input [(ngModel)]="item.post.title" type="text" (keyup.enter)="blur()" #titleInput>
      <p>{{item.album.title}}</p>
      <p>{{item.user.name}}</p>
      <button (click)="delete()">delete item</button>
    </div>
  `
})
export class ListItemComponent implements OnInit {

  @Input() item: Item;
  @Output() onDeleteItem = new EventEmitter<number>();
  @ViewChild('titleInput') titleInput: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.onDeleteItem.emit(this.item.post.id);
  }

  blur() {
    this.titleInput.nativeElement.blur();
  }
}
