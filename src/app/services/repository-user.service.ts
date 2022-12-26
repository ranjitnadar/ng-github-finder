import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../env/dev';
import { Repository } from '../models/repository';
import { UsersInterface } from '../interfaces/userInterface';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RepositoryUserService {
  getRepositoryDetails: Repository;
  userListAPI = env.apiUrl;
  userDetailAPI = `${env.apiUrl}/users`;
  constructor(private http: HttpClient) {}
  /**
   * @name searchResults
   * @description Search github profile using username
   */
  searchResults(username: string): Observable<UsersInterface> {
    return this.http
      .get<UsersInterface>(`${this.userListAPI}/search/users?q=${username}`)
      .pipe(map((response: any) => response.items));
  }
  /**
   * @name userDetails
   * @description Get github profile detail using username
   */
  userDetails(username: string): Observable<UsersInterface> {
    return this.http.get<UsersInterface>(`${this.userDetailAPI}/${username}`);
  }
  /**
   * @name userRepoDetail
   * @description Get github user repo detail using username
   */
  userRepoDetail(username: string): Observable<UsersInterface> {
    return this.http.get<UsersInterface>(
      `${this.userDetailAPI}/${username}/repos?per_page=15&sort=creted:asc`
    );
  }
}
