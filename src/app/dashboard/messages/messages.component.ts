import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  applyingAdvisors: any[] = [];
  approvedAdvisors: any[] = [];
  showCreateAdvisorModal: boolean = false;
  newAdvisor: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchApplyingAdvisors();
    this.fetchApprovedAdvisors();
  }

  fetchApplyingAdvisors(): void {
    this.http.get<any[]>('https://api.example.com/applying-advisors').subscribe(
      data => this.applyingAdvisors = data,
      error => console.error('Error fetching applying advisors', error)
    );
  }

  fetchApprovedAdvisors(): void {
    this.http.get<any[]>('https://api.example.com/approved-advisors').subscribe(
      data => this.approvedAdvisors = data,
      error => console.error('Error fetching approved advisors', error)
    );
  }

  acceptAdvisor(advisorId: string): void {
    this.http.post(`https://api.example.com/accept-advisor/${advisorId}`, {}).subscribe(
      () => {
        this.fetchApplyingAdvisors();
        this.fetchApprovedAdvisors();
      },
      error => console.error('Error accepting advisor', error)
    );
  }

  rejectAdvisor(advisorId: string): void {
    this.http.post(`https://api.example.com/reject-advisor/${advisorId}`, {}).subscribe(
      () => this.fetchApplyingAdvisors(),
      error => console.error('Error rejecting advisor', error)
    );
  }

  openCreateAdvisorModal(): void {
    this.showCreateAdvisorModal = true;
  }

  closeCreateAdvisorModal(): void {
    this.showCreateAdvisorModal = false;
    this.newAdvisor = {};
  }

  createNewAdvisor(): void {
    this.http.post('https://api.example.com/create-advisor', this.newAdvisor).subscribe(
      () => {
        this.closeCreateAdvisorModal();
        this.fetchApplyingAdvisors();
      },
      error => console.error('Error creating advisor', error)
    );
  }
}
