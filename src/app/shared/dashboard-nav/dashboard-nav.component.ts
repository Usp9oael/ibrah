import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../service/auth/user-auth.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.css']
})

// implements oninit
export class DashboardNavComponent implements OnInit  {
  user!: User;
  sidebarOpen = false; 
  isDropdownOpen: boolean = false;
  showLogoutConfirmation: boolean = false;
  profile: any;
  loading = false;
  error = false;

  constructor(public userAuthService: UserAuthService, private router: Router) {}
  ngOnInit(): void {
    this.loading = true;
    this.userAuthService.getProfile().subscribe(
      (data) => {
        console.log('Profile data:', data); // Log profile data
        this.profile = data;
        this.loading = false;
      },
      (error) => {
        console.error('Failed to fetch profile data', error); // Log errors
        this.error = true;
        this.loading = false;
      }
    );
  }

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
