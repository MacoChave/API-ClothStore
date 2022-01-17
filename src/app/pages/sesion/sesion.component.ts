import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css'],
})
export class SesionComponent implements OnInit {
  sesionForm: FormGroup = new FormGroup({
    user: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  autenticar(): void {
    this.authService.login(this.sesionForm.value).subscribe({
      next: (v) => {
        this.authService.token = v.token;
        this.router.navigateByUrl('dashboard');
      },
      error: (err) => alert(err),
      complete: () => console.info('Complete'),
    });
  }
}
