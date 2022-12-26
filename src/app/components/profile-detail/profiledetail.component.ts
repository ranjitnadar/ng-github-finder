import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'profile-detail',
  templateUrl: './profiledetail.component.html',
  styleUrls: ['./profiledetail.component.css'],
})
export class ProfileDetailComponent {
  @Input() user = null;
  @Input() userRepo = null;
  @Output() backToSearch = new EventEmitter<string>();
  constructor() {}
  getSearchList(): void {
    this.user = null;
    this.backToSearch.emit(null);
  }
}
