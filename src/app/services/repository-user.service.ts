import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../env/dev';
import { Repository } from '../models/repository';
// import { User } from '../models/user';
import { UsersInterface } from '../interfaces/userInterface';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RepositoryUserService {
  // getUserDetails: User;
  getRepositoryDetails: Repository;
  userListAPI = env.apiUrl;
  userDetailAPI = `${env.apiUrl}/users`;
  constructor(private http: HttpClient) {}
  searchResults(username: string): Observable<UsersInterface> {
    return this.http
      .get<UsersInterface>(`${this.userListAPI}/search/users?q=${username}`)
      .pipe(map((response: any) => response.items));
  }
  // Get user details
  userDetails(username: string): Observable<UsersInterface> {
    return this.http.get<UsersInterface>(`${this.userDetailAPI}/${username}`);
  }

  // Get single user
  userDetail(username: string): Observable<UsersInterface> {
    return this.http.get<UsersInterface>(`${this.userDetailAPI}/${username}`);
  }
}
