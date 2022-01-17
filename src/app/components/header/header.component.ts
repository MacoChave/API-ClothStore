import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Dashboard';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logup(): void {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('sesion');
  }
}
