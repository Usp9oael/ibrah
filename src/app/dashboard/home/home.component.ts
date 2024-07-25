import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user';
import { UserAuthService } from '../../service/auth/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!: User;
  sidebarOpen = false; 
  isDropdownOpen: boolean = false;
  showLogoutConfirmation: boolean = false;
  profile: any;
  loading = false;
  error = false;
  greeting: string = '';
  fancyData: any;

  constructor(private router: Router, public userAuthService: UserAuthService) {}

  ngOnInit(): void {
    this.setGreeting();
    this.fetchProfile();
    this.setFancyData();
  }

  setGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greeting = 'Good Morning';
    } else if (currentHour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  fetchProfile(): void {
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

  setFancyData() {
    // Example of setting some fancy data
    this.fancyData = {
      welcomeMessage: "Welcome to your dashboard!",
      tips: [
        "Tip 1: Keep your profile updated.",
        "Tip 2: Check your notifications regularly.",
        "Tip 3: Use strong passwords for your accounts."
      ],
      stats: {
        completedTasks: 42,
        pendingTasks: 17,
        messages: 5
      }
    };
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
