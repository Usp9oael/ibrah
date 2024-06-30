import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../service/auth/user-auth.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})
export class DashboardNavComponent implements OnInit {
  user!: User;
  sidebarOpen = false; 
  isDropdownOpen: boolean = false;

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') === "" || localStorage.getItem('token') === null) {
      this.router.navigateByUrl('/');
    } else {
      this.userAuthService.getUser().then(({ data }) => {
        this.user = data;
      });
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.sidebarOpen = false; 
  }

  logoutAction() {
    this.userAuthService.logout().then(() => {
      localStorage.setItem('token', "");
      this.router.navigateByUrl('/');
    }).catch(() => {
      localStorage.setItem('token', "");
      this.router.navigateByUrl('/');
    });
  }
}
