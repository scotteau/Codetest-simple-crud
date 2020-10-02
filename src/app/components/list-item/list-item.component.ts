import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {Item} from '../../models/interfaces';

@Component({
  selector: 'app-list-item',
  // templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  template: `
    <div class="listItem" [ngClass]="shouldShowPopup && 'listItem--selected'">
      <div class="left">
        <span class="material-icons-outlined icon">audiotrack</span>

        <div class="content">
          <input class="header"
                 [(ngModel)]="item.post.title"
                 type="text"
                 (blur)="blur()"
                 (keyup.enter)="blur()"
                 [ngClass]="!shouldEditTitle && 'header--hidden'"
                 [spellcheck]="false"
                 #titleInput
          >

          <span class="header"
                [ngClass]="shouldEditTitle && 'header--hidden'">{{item.post.title}}</span>
          <p class="album">
            <span class="id">#{{item.post.id}}</span>
            <span>
           {{item.album.title | uppercase}}
        </span></p>
        </div>

      </div>


      <div class="right">
        <span class="name">
          {{item.user.name}}
        </span>

        <span class="material-icons-outlined icon" (click)="openPopup()">more_horiz</span>

        <div class="popup" *ngIf="shouldShowPopup" (clickOutside)="dismiss($event)">
          <ul>
            <li (click)="startEdit()">Edit</li>
            <li (click)="delete()">Delete</li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class ListItemComponent implements OnInit {

  @Input() item: Item;
  @Output() onDeleteItem = new EventEmitter<number>();
  @ViewChild('titleInput') titleInput: ElementRef;

  shouldShowPopup = false;
  shouldEditTitle = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.onDeleteItem.emit(this.item.post.id);
    this.shouldShowPopup = false;
  }

  blur(): void {
    this.shouldEditTitle = false;
  }

  openPopup(): void {
    this.shouldShowPopup = true;
  }

  dismiss(e: MouseEvent) {
    console.log('should dismiss');
  }

  startEdit() {
    this.shouldEditTitle = true;
    this.shouldShowPopup = false;
    setTimeout(() => {
      this.titleInput.nativeElement.focus();
    });
  }
}
