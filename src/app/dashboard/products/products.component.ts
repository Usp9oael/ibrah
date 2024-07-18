import { Component, OnInit } from '@angular/core';
import { FundsService } from '../../service/funds/funds.service';
import { Fund } from '../../../types/fund.model';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
searchFunds() {
throw new Error('Method not implemented.');
}
editFund(arg0: number) {
throw new Error('Method not implemented.');
}
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
searchQuery: any;

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
      // Reset newFund object after successful creation
      this.newFund = {
        id: 0,
        name: '',
        abbreviation: '',
        fundType: '',
        currency: '',
        rate: 0
      };
      // Fetch funds again to update the list
      this.fetchFunds();
      // Close the modal after creating a new fund
      this.closeCreateFundModal();
    }, error => {
      console.error('Error creating fund:', error);
      // Optionally handle error here
    });
  }

  deleteFund(id: number): void {
    this.fundService.deleteFund(id).subscribe(() => {
      // Filter out the deleted fund from the local array
      this.funds = this.funds.filter(fund => fund.id !== id);
    }, error => {
      console.error('Error deleting fund:', error);
      // Optionally handle error here
    });
  }
}
