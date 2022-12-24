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
  users: any;
  searchText!: string;
  displayUserDetailContainer = false;
  displayGithubUserErrorNotFound = false;
  constructor(private userservice: RepositoryUserService) {}

  //accessing form inputs
  @ViewChild('f')
  searchForm!: NgForm;

  ngOnInit(): void {}
  getUsers(search: any) {
    this.userservice
      .searchResults(search)
      .subscribe((data: any) => (this.users = data));
  }
}
