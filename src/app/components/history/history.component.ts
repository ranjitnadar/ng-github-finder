import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'user-search-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  name = 'Angular ' + VERSION.major;
}
