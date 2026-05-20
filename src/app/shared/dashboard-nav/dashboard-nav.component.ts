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
  isDropdownOpen = false;
  showLogoutConfirmation = false;
  profile: any = null;
  loading = false;
  error = false;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.loading = true;
  this.userAuthService.getProfile()
    .then((res: any) => {
      this.profile = res?.profile ?? null;
      this.loading = false;
    })
    .catch((err: any) => {
      console.error(err);
      this.error = true;
      this.loading = false;
    });
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
