import { Component, OnInit } from '@angular/core';
import { FundsService } from '../../service/funds/funds.service';
import { Fund } from '../../../types/fund.model';
import { catchError, retry } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  funds: Fund[] = [];
  newFund: Fund = {
    id: 0,
    name: '',
    abbreviation: '',
    fundType: '',
    currency: '',
    rate: 0
  };
  showCreateFundModal = false;
  retryAttempts = 3;

  constructor(private fundService: FundsService) {}

  ngOnInit(): void {
    this.fetchFunds();
  }

  fetchFunds(): void {
    this.fundService.getAllFunds().pipe(
      retry(this.retryAttempts),
      catchError(error => {
        console.error('Error fetching funds:', error);
        return []; // Return an empty array on error
      })
    ).subscribe(
      funds => {
        this.funds = funds;
      }
    );
  }

  openCreateFundModal(): void {
    this.showCreateFundModal = true;
  }

  closeCreateFundModal(): void {
    this.showCreateFundModal = false;
  }

  createNewFund(): void {
    this.fundService.createFund(this.newFund).subscribe(() => {
      this.newFund = {
        id: 0,
        name: '',
        abbreviation: '',
        fundType: '',
        currency: '',
        rate: 0
      };
      this.fetchFunds();
      this.closeCreateFundModal();
    });
  }

  deleteFund(id: number): void {
    this.fundService.deleteFund(id).subscribe(() => {
      this.funds = this.funds.filter(fund => fund.id !== id);
    }, error => {
      console.error('Error deleting fund:', error);
      // Optionally handle error here
    });
  }
}
