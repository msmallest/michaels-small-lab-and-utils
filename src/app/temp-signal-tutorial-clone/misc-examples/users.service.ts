import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./users.model";
import {map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
      map((users) => users.slice(0, 1))
    )
  }

  public getUsersNames(): Observable<Pick<User, 'name'>[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
      map((users) => users.map(user => {
        const {name, ...rest} = user;
        return {name: name};
      }).splice(0, 2)),
    )
  }
}
