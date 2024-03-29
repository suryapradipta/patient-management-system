import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-desktop-sidebar',
  templateUrl: './desktop-sidebar.component.html',
  styleUrls: ['./desktop-sidebar.component.css'],
})
export class DesktopSidebarComponent {
  selectedMenuItem: string = '';

  selectMenuItem(menuItem: string): void {
    this.selectedMenuItem = menuItem;
  }

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Log out!', 'You have been logged out.', 'success');
        this.authService.logOut();
        this.router.navigate(['/']);
      }
    });
  }
}
