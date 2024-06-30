import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() closeSidebarEvent = new EventEmitter<void>();

  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
    this.closeSidebarEvent.emit();
  }

  closeSidebar() {
    this.closeSidebarEvent.emit();
  }
}
