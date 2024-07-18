import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FinancialAdvisor {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  profession: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  applyingAdvisors: FinancialAdvisor[] = [];
  approvedAdvisors: FinancialAdvisor[] = [];
  showCreateAdvisorForm: boolean = false;
  newAdvisor: Partial<FinancialAdvisor> = {};
  isModalVisible: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchApplyingAdvisors();
    this.fetchApprovedAdvisors();
  }

  fetchApplyingAdvisors(): void {
    this.http.get<FinancialAdvisor[]>('https://investmentapp-1.onrender.com/api/financial_advisors/pending').subscribe(
      data => this.applyingAdvisors = data,
      error => console.error('Error fetching applying advisors', error)
    );
  }

  fetchApprovedAdvisors(): void {
    this.http.get<FinancialAdvisor[]>('https://investmentapp-1.onrender.com/api/financial_advisors/enrolled').subscribe(
      data => this.approvedAdvisors = data,
      error => console.error('Error fetching approved advisors', error)
    );
  }

  acceptAdvisor(advisorId: number): void {
    this.http.post(`https://investmentapp-1.onrender.com/api/financial_advisors/pending/accept/{id}${advisorId}`, {}).subscribe(
      () => {
        this.fetchApplyingAdvisors();
        this.fetchApprovedAdvisors();
      },
      error => console.error('Error accepting advisor', error)
    );
  }

  rejectAdvisor(advisorId: number): void {
    this.http.post(`https://api.example.com/reject-advisor/${advisorId}`, {}).subscribe(
      () => this.fetchApplyingAdvisors(),
      error => console.error('Error rejecting advisor', error)
    );
  }

  toggleCreateAdvisorForm(): void {
    this.showCreateAdvisorForm = !this.showCreateAdvisorForm;
    if (!this.showCreateAdvisorForm) {
      this.newAdvisor = {};
    }
  }
  
  closeCreateAdvisorForm () {
    this.showCreateAdvisorForm = false;
  }

  createNewAdvisor(): void {
    this.http.post('https://api.example.com/create-advisor', this.newAdvisor).subscribe(
      () => {
        this.toggleCreateAdvisorForm();
        this.fetchApplyingAdvisors();
      },
      error => console.error('Error creating advisor', error)
    );
  }

  // code to open modal
  openModal() {
    this.isModalVisible = true;
  }

  // code to modal
  closeModal() {
    this.isModalVisible = false;
  }
}
