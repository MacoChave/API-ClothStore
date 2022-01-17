import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: { class: 'childPage' },
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
