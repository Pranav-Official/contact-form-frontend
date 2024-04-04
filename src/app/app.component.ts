import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'contact-form-frontend';
  authButtonLabel = 'Login';
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }
  isLoggedIn() {
    if (localStorage.getItem('access_token')) {
      return true;
    } else {
      return false;
    }
  }

  authButtonClick() {
    if (localStorage.getItem('access_token')) {
      localStorage.clear();
      window.location.reload();
      this.isAuthenticated = false;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
