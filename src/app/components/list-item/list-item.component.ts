import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../models/interfaces';

@Component({
  selector: 'app-list-item',
  // templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  template: `
    <div>
      <p>{{item.post.title}}</p>
      <p>{{item.album.title}}</p>
      <p>{{item.user.name}}</p>
    </div>
  `
})
export class ListItemComponent implements OnInit {

  @Input() item: Item;

  constructor() {
  }

  ngOnInit(): void {
  }

}
