import { Component, OnInit } from '@angular/core';

interface User {
  fullName: string;
  email: string;
  password: string;
  showPassword?: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [
    { fullName: 'John Doe', email: 'john@example.com', password: 'password123' },
    { fullName: 'Jane Smith', email: 'jane@example.com', password: 'password456' },
    { fullName: 'Alice Johnson', email: 'alice@example.com', password: 'password789' },
    { fullName: 'Bob Brown', email: 'bob@example.com', password: 'password321' },
    { fullName: 'Charlie Davis', email: 'charlie@example.com', password: 'password654' },
    { fullName: 'Diana Evans', email: 'diana@example.com', password: 'password987' },
    { fullName: 'Evan Ford', email: 'evan@example.com', password: 'password234' },
    { fullName: 'Fiona Green', email: 'fiona@example.com', password: 'password567' },
    { fullName: 'George Hill', email: 'george@example.com', password: 'password890' },
    { fullName: 'Hannah Ives', email: 'hannah@example.com', password: 'password012' }
  ];

  constructor() {}

  ngOnInit(): void {}

  togglePasswordVisibility(index: number): void {
    this.users[index].showPassword = !this.users[index].showPassword;
  }
}
