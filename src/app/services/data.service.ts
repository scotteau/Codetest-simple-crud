import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Album, Item, Post, User} from '../models/interfaces';
import {combineLatest, Observable, of, throwError} from 'rxjs';
import {catchError, filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  numberOfItems = 8;

  posts$ = this.http.get<Post[]>(this.postsUrl).pipe(
    map((posts) => posts.slice(0, this.numberOfItems))
  );
  albums$ = this.http.get<Album[]>(this.albumsUrl);
  users$ = this.http.get<User[]>(this.usersUrl);

  data$ = combineLatest([this.posts$, this.albums$, this.users$]).pipe(
    catchError(this.handleError),
    filter(([item]) => !!item),
    map(([posts, albums, users]) => (
      posts.map((p) => ({
        post: p,
        album: this.getRandomContent(albums),
        user: this.getRandomContent(users)
      } as Item))
    )),
  );

  constructor(private http: HttpClient) {
  }

  private getRandomContent(listOfContent: User[] | Album[]): Album | User {
    const max = listOfContent.length - 1;
    const randomIndex = Math.floor(Math.random() * max);
    return listOfContent[randomIndex];
  }

  private handleError(err): Observable<any> {
    let message: string;
    if (typeof (err) === 'string') {
      message = err;
    } else {
      if (err.error instanceof ErrorEvent) {
        message = `An error occurred: ${err.error.message}`;
      } else {
        message = `Backend returned code ${err.status}: ${err.body.error}`;
      }
    }
    console.error(message);
    return throwError(message);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.patch(`${this.postsUrl}/${post.id}`, post).pipe(
      catchError(this.handleError)
    );
  }

  deleteItem(item: Item): Observable<any> {
    // todo - implement method when the deletion logic is more clear
    console.log(`Should delete item with id - ${item.post.id}`);
    return of(null);
  }
}
