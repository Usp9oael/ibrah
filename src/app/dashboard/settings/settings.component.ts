import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor() {}

  saveProfileChanges() {
    // Implement logic to save profile changes
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    // Add service calls or API interactions here
  }

  changePassword() {
    // Implement logic to change password
    console.log('New Password:', this.password);
    // Add service calls or API interactions here
  }
}
