import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent implements OnInit {
  withdrawals: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getWithdrawals();
  }

  getWithdrawals(): void {
    this.http.get<any[]>('https://ngrok_api/withdrawals')
      .subscribe(data => {
        this.withdrawals = data;
      }, error => {
        console.error('There was an error!', error);
      });
  }

  approveWithdrawal(id: number): void {
    this.http.post(`https://ngrok_api/withdrawals/${id}/approve`, {})
      .subscribe(response => {
        console.log('Withdrawal approved', response);
        this.getWithdrawals();
      }, error => {
        console.error('Error approving withdrawal', error);
      });
  }
}
