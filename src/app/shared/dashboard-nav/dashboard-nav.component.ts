import { Component } from '@angular/core';
import { UserAuthService } from '../../service/auth/user-auth.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})

// implements oninit
export class DashboardNavComponent  {
  user!: User;
  sidebarOpen = false; 
  isDropdownOpen: boolean = false;
  showLogoutConfirmation: boolean = false;

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.sidebarOpen = false; 
  }

  confirmLogout() {
    this.showLogoutConfirmation = true;
  }

  cancelLogout() {
    this.showLogoutConfirmation = false;
  }

  
}
