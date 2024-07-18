import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFetchService } from '../../service/UsersFetch/user-fetch.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './usersdetails.component.html', // Ensure this matches the actual file name
  styleUrls: ['./usersdetails.component.css']
})
export class UserDetailsComponent implements OnInit {
goBack() {
throw new Error('Method not implemented.');
}
  user: any; // Define the user type accordingly

  constructor(private route: ActivatedRoute, private userFetchService: UserFetchService) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Get the user ID from the route
    this.fetchUserDetails(userId);
  }

  fetchUserDetails(userId: string | null) {
    if (userId) {
      this.userFetchService.getUserById(userId).subscribe(
        (user: any) => {
          this.user = user;
        },
        (error: any) => {
          console.error('Error fetching user details', error);
        }
      );
    } else {
      console.error('User ID is null. Cannot fetch user details.');
    }
  }
}
