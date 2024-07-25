import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
    this.closeSidebarEvent.emit();
  }

  closeSidebar() {
    this.closeSidebarEvent.emit();
  }

  Logout() {
    this.showLogoutConfirmation = true;
    this.sidebarOpen = false
    localStorage.removeItem("authToken")
    this.router.navigate(["/login"])
  }

  cancelLogout() {
    this.showLogoutConfirmation = false;
  }
}
