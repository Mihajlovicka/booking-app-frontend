import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private userService: UserService) {}

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  home() {
    this.router.navigate(['']);
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }

  register() {
    this.router.navigate(['/auth/register']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  accommodation() {
    this.router.navigate(['/accommodations']);
  }
}
