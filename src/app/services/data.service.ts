import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Album, Item, Post, User} from '../models/interfaces';
import {combineLatest} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  posts$ = this.http.get<Post[]>(this.postsUrl).pipe();
  albums$ = this.http.get<Album[]>(this.albumsUrl).pipe();
  users$ = this.http.get<User[]>(this.usersUrl).pipe();

  data$ = combineLatest([this.posts$, this.albums$, this.users$]).pipe(
    map(([posts, albums, users]) => (
      posts.map((p) => ({
        id: this.getUUID(),
        post: p,
        album: this.getRandomContent(albums),
        user: this.getRandomContent(users)
      } as Item))
    ))
  );

  constructor(private http: HttpClient) {
  }

  private getUUID() {
    return uuidv4();
  }

  private getRandomContent(listOfContent: User[] | Album[]) {
    const max = listOfContent.length - 1;
    const randomIndex = Math.floor(Math.random() * max);
    return listOfContent[randomIndex];
  }
}
