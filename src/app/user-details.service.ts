import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import * as moment from 'moment';
import { map, startWith, filter, flatMap, tap } from 'rxjs/operators';

@Injectable()
export class UserDetailsService {

  private randomUserApiUrl = 'https://randomuser.me/api/?results=10&exc=login&seed=rti';

  constructor(private http: HttpClient) { }

  getUsers(pageNumber: number): Observable<[]> {
    return this.http.get<[]>(this.randomUserApiUrl + '&page=' + pageNumber)
      .pipe(
        map((res: any[]) => res["results"])
      );
  }

  getDuration(registrationDate: Date) {
    return moment(registrationDate).fromNow();
  }

  searchUsers(searchTerm: string): Observable<any[]> {
    const localUserData = localStorage.getItem('UserSearchData');
    const UserData = of(JSON.parse(localUserData));
    if (!searchTerm.trim()) {
      return UserData;
    }
    else {
      const filteredUserData = UserData.pipe(
        map((Data) => Data.filter(User => User.name.last.startsWith(searchTerm) || User.name.first.startsWith(searchTerm)))
      );
      return filteredUserData;
    }


  }

}
