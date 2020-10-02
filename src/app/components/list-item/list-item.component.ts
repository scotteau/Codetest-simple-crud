import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {Item} from '../../models/interfaces';
import {DataService} from '../../services/data.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-list-item',
  // templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  template: `
    <div class="listItem"
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
                (click)="startEdit()"
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
export class ListItemComponent implements OnInit, OnDestroy {

  @Input() item: Item;
  @Output() onDeleteItem = new EventEmitter<number>();
  @ViewChild('titleInput') titleInput: ElementRef;
  sub = new SubSink();

  shouldEditTitle = false;
  shouldShowIcon = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  delete($event: MouseEvent): void {
    $event.stopPropagation();
    this.onDeleteItem.emit(this.item.post.id);
    this.sub.sink = this.dataService.deleteItem(this.item).subscribe((data) => {
      console.log(data);
    });
  }

  blur(): void {
    this.shouldEditTitle = false;
    this.sub.sink = this.dataService.updatePost(this.item.post).subscribe((data) => {
      this.item = {...this.item, post: data};
    });
  }


  startEdit() {
    this.shouldEditTitle = true;
    setTimeout(() => {
      this.titleInput.nativeElement.focus();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
