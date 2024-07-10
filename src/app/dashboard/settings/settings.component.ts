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
  }

  changePassword() {
  }
}
