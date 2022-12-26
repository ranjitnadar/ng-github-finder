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
  searchText: String = null;
  displayUserDetailContainer: Boolean = false;
  displayGithubUserErrorNotFound: Boolean = false;
  searchContainerHeight: any = {};
  constructor(private userservice: RepositoryUserService) {}

  //accessing form inputs
  @ViewChild('f')
  searchForm!: NgForm;

  ngOnInit(): void {
    this.setUserListHeight();
    // this.getUsers();
  }
  getUsers(search: any): void {
    console.log(this.searchText);
    this.user = null;
    if (search.length == 0) {
      this.users = [];
      this.setUserListHeight(); //set user list height
    } else {
      this.userservice.searchResults(search).subscribe((data: any) => {
        this.users = data;
        this.setUserListHeight(); //set user list height
      });
    }
  }

  getUserDetail(param: any): void {
    this.userservice.userDetails(param.login).subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
    this.userservice.userRepoDetail(param.login).subscribe((repo) => {
      this.userRepo = repo;
    });
  }
  getSearchList(): void {
    this.user = null;
  }
  setUserListHeight(): void {
    let tempHeight = !this.users || this.users.length == 0 ? '60vh' : '30vh';
    console.log(tempHeight, this.users);
    this.searchContainerHeight = {
      // borderBottom: '3px solid lightgreen'
      ['height']: tempHeight,
    };
  }
}
