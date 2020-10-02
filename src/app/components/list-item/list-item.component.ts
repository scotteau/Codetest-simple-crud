import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {Item} from '../../models/interfaces';

@Component({
  selector: 'app-list-item',
  // templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  template: `
    <div class="listItem" (click)="startEdit()"
         (mouseenter)="shouldShowIcon = true"
         (mouseleave)="shouldShowIcon = false">
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

          <span class="header title"
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

        <span class="material-icons-outlined icon"
              [ngClass]="!shouldShowIcon && 'icon--hidden'" (click)="delete($event)">delete</span>

      </div>
    </div>
  `
})
export class ListItemComponent implements OnInit {

  @Input() item: Item;
  @Output() onDeleteItem = new EventEmitter<number>();
  @ViewChild('titleInput') titleInput: ElementRef;

  shouldEditTitle = false;
  shouldShowIcon = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  delete($event: MouseEvent): void {
    $event.stopPropagation();
    this.onDeleteItem.emit(this.item.post.id);
  }

  blur(): void {
    this.shouldEditTitle = false;
  }


  startEdit() {
    this.shouldEditTitle = true;
    setTimeout(() => {
      this.titleInput.nativeElement.focus();
    });
  }
}
