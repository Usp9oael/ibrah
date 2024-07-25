// src/app/models/transaction.ts
export interface Transaction {
    id: number;
    accountDetails: string | null;
    phoneNumber: string;
    accountName: string;
    amount: number;
    paymentMode: string;
    transactionType: string;
    paymentTime: string;
    financialAdvisor: string;
    accountNumber: string;
    date: string;
    description: string;
  }
  