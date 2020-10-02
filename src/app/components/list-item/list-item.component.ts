import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {Item} from '../../models/interfaces';

@Component({
  selector: 'app-list-item',
  // templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  template: `
    <!--      <input [(ngModel)]="item.post.title" type="text" (keyup.enter)="blur()" #titleInput pInputText disabled>-->
    <div class="left">
      <span class="material-icons-outlined icon">audiotrack</span>

      <div class="content">
          <span class="header">{{item.post.title | titlecase}} - {{item.post.id}}</span>
          <span class="album">{{item.album.title | uppercase}}</span>
        </div>

      </div>


    <div class="right">
        <span class="name">
          {{item.user.name}}
        </span>
    </div>
    <!--      <button pButton class="p-button-sm p-button-danger" label="Delete Item" (click)="delete()"></button>-->
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
