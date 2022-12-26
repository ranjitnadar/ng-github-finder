import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RepositoryUserService } from '../../services/repository-user.service';
import { User } from '../../models/user';
@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  users: any = [];
  user: any = null;
  userRepo: any = null;
  searchHistory: any = {};
  searchText: String = null;
  isHistoryActive: Boolean = false;
  displayUserDetailContainer: Boolean = false;
  displayGithubUserErrorNotFound: Boolean = false;
  searchContainerHeight: any = {};
  constructor(private userservice: RepositoryUserService) {}

  //accessing form inputs
  @ViewChild('f')
  searchForm!: NgForm;

  ngOnInit(): void {
    this.setUserListHeight();
  }
  getUsers(search: any = null): void {
    this.user = null;
    this.searchText = search;
    this.isHistoryActive = false;
    if (search == null || search?.length == 0) {
      this.users = [];
      this.setUserListHeight(); //set user list height
    } else {
      this.searchHistory[search] = search;
      this.userservice.searchResults(search).subscribe((data: any) => {
        this.users = data;
        this.setUserListHeight(); //set user list height
      });
    }
  }

  getUserDetail(param: any): void {
    this.userservice.userDetails(param.login).subscribe((user) => {
      this.user = user;
    });
    this.userservice.userRepoDetail(param.login).subscribe((repo) => {
      this.userRepo = repo;
    });
  }
  getHistoryList(): void {
    this.isHistoryActive = true;
  }
  getSearchList(): void {
    this.user = null;
  }
  setUserListHeight(): void {
    let tempHeight = !this.users || this.users.length == 0 ? '60vh' : '30vh';
    this.searchContainerHeight = {
      ['height']: tempHeight,
    };
  }
  handleSeachHistoryHash(param): string[] {
    return Object.keys(param);
  }
  removeHistory(param): void {
    if (this.searchHistory.hasOwnProperty(param)) {
      delete this.searchHistory[param];
      this.searchText = null;
    }
    if (Object.keys(this.searchHistory).length == 0) {
      this.getUsers();
    }
  }
}
