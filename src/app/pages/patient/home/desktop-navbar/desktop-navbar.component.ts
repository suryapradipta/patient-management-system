import { Component } from '@angular/core';
import {AuthService} from "../../../../shared/services";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-desktop-navbar',
  templateUrl: './desktop-navbar.component.html',
  styleUrls: ['./desktop-navbar.component.css']
})
export class DesktopNavbarComponent {
  pages = [
    { name: 'Products', href: '/' },
    { name: 'Company', href: '/' },
    { name: 'Services', href: '/' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    const user = this.authService.getCurrentUserJson();
    return user && user.role === 'patient';
  }

  onLogout(): void {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logOut();
        this.router.navigate(['/']).then(r =>
          Swal.fire('Log out!', 'You have been logged out.', 'success'));
      }
    });
  }
}
