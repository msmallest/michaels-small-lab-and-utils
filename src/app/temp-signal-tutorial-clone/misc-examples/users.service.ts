import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Users} from "./users.model";
import {map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>('https://jsonplaceholder.typicode.com/users').pipe(
      map((users) => users.slice(0, 1))
    )
  }
}
