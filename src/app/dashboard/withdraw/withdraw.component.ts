import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  withdrawals: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getWithdrawals();
  }

  getWithdrawals(): void {
    this.http.get<any[]>('https://smartinvest.onrender.com/api/open/admins/withdrawals/pending')
      .subscribe(data => {
        this.withdrawals = data;
      }, error => {
        console.error('There was an error!', error);
      });
  }

  approveWithdrawal(id: number): void {
    this.http.post(`https://smartinvest.onrender.com/api/open/admins/withdrawals/pending/accept/${id}`, {})
      .subscribe(response => {
        console.log('Withdrawal approved', response);
        this.getWithdrawals(); // Refresh the list of withdrawals after approving one
      }, error => {
        console.error('Error approving withdrawal', error);
      });
  }

  rejectWithdrawal(id: number): void {
    this.http.delete(`https://smartinvest.onrender.com/api/open/admins/withdrawals/pending/reject/${id}`)
      .subscribe(response => {
        console.log('Withdrawal rejected', response);
        this.getWithdrawals(); // Refresh the list of withdrawals after rejecting one
      }, error => {
        console.error('Error rejecting withdrawal', error);
      });
  }
  
}
