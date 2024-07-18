export interface User {
    id: number;
    surname: string;
    middleName: string;
    firstName: string;
    dateOfBirth: string; // Consider using Date type if you're managing dates
    idPassportNo: string;
    nationality: string;
    email: string;
    postalAddress: string;
    accountName: string;
    accountNumber: string;
    accountType: string;
    bankName: string;
    branch: string;
    bankCode: string;
    nextOfKin: {
      name: string;
      relationship: string;
      idPassportNo: string;
    };
    telephoneNumber: string;
    frontSidePath?: string; // Optional
    backSidePath?: string; // Optional
  }
  