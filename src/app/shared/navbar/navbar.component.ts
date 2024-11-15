import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.isAdmin = user?.email == environment.adminEmail;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }
}
