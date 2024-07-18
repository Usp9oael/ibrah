import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFetchService } from '../../service/UsersFetch/user-fetch.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent 
 {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';
  searchCriteria: string = 'id';
  isModalVisible: boolean = false;

  constructor(private userFetchService: UserFetchService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userFetchService.getRequest('/api/fetchUsers').subscribe(
      (users: any[]) => {
        this.users = users;
        this.filteredUsers = [...this.users];
        console.log("Fetched Users", users);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching users', error);
        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error:', error.error.message);
        } else {
          console.error(`Backend returned code ${error.status}, body was: ${error.error.text}`);
        }
      }
    );
  }

  viewUserDetails(userId: number) {
    this.router.navigate(['/view-user', userId]);
  }

  searchUsers() {
    if (!this.searchQuery.trim()) {
      this.filteredUsers = [...this.users];
      return;
    }

    this.filteredUsers = this.users.filter(user => {
      const searchTerm = this.searchQuery.toLowerCase();
      switch (this.searchCriteria) {
        case 'id':
          return user.id.toString().toLowerCase().includes(searchTerm);
        case 'surname':
          return user.surname.toLowerCase().includes(searchTerm);
        case 'middleName':
          return user.middleName.toLowerCase().includes(searchTerm);
        case 'firstName':
          return user.firstName.toLowerCase().includes(searchTerm);
        case 'email':
          return user.email.toLowerCase().includes(searchTerm);
        case 'passport':
          return user.idPassportNo.toLowerCase().includes(searchTerm);
        case 'nationality':
          return user.nationality.toLowerCase().includes(searchTerm);
        case 'postalAddress':
          return user.postalAddress.toLowerCase().includes(searchTerm);
        case 'accountName':
          return user.accountName.toLowerCase().includes(searchTerm);
        case 'accountNumber':
          return user.accountNumber.toLowerCase().includes(searchTerm);
        case 'accountType':
          return user.accountType.toLowerCase().includes(searchTerm);
        case 'bankName':
          return user.bankName.toLowerCase().includes(searchTerm);
        case 'branch':
          return user.branch.toLowerCase().includes(searchTerm);
        case 'bankCode':
          return user.bankCode.toLowerCase().includes(searchTerm);
        case 'nextOfKin':
          return user.nextOfKin.name.toLowerCase().includes(searchTerm);
        default:
          return false;
      }
    });
  }

  deleteUser(userId: number) {
    if (confirm(`Are you sure you want to delete user ${userId}?`)) {
      this.userFetchService.deleteUser(userId).subscribe(
        () => {
          console.log(`User ${userId} deleted successfully.`);
          this.users = this.users.filter(user => user.id !== userId);
          this.filteredUsers = [...this.users]; 
        },
        (error: HttpErrorResponse) => {
          console.error(`Error deleting user ${userId}:`, error);
          alert(`Error deleting user: ${error.message}`);
        }
      );
    }
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
