import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../service/auth/user-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any;
  loading = false;
  error = false;
  // Old photo URL
// photoUrl = 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg';

// New photo URL representing the admin picture
photoUrl = 'https://t3.ftcdn.net/jpg/01/21/24/20/240_F_121242015_hRYuVPJmzhWQdvrkh3dk5MqjNxY3JzTr.jpg';  // Image URL for the admin picture



  constructor(private userAuthService: UserAuthService) { }

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
}
