import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../service/auth/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() closeSidebarEvent = new EventEmitter<void>();
  sidebarOpen = false; 
  isDropdownOpen: boolean = false;
  showLogoutConfirmation: boolean = false;

  constructor(private authService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.closeSidebarEvent.emit();
  }

  closeSidebar() {
    this.closeSidebarEvent.emit();
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
