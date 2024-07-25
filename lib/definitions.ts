// import { Project, Profile } from '@prisma/client';
export type Project = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  fundingDate: string;
  status: string;
  qtyPortions: number;
  valueByPortion: number;
  availablePortions: number;
  targetAmount: string;
  minimumAmount: string;
  riskLevel: number;
  financialInfoFile: string;
  rate: string;
  companyId: number;
  Company: {
    logoFile: string;
    name: string;
    termsConditionsFile: string;
    siteUrl: string;
    locationUrl: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type PaginatedResponse<T> = {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
};

export type Profile = {
  id: number;
  picture: string | null;
  bio: string | null;
  birthdate: Date | null;
  civilStatus: string | null;
  educationDegree: string | null;
  gender: string | null;
  frontIdDocumentFile: string | null;
  reverseIdDocumentFile: string | null;
  swornDeclaration: boolean | null;
  safetyNotices: boolean | null;
  commercialContract: boolean | null;
  contractSigningDate: Date;
  occupation: string | null;
  sector: string | null;
  mainActivity: string | null;
  address: string | null;
  sinceDate: string | null;
  typerOfHousing: string | null;
  amountRetailPay: string | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProfileRequest = {
  gender: string;
  birthdate: Date;
  address: string;
  frontIdDocumentFile: File;
  reverseIdDocumentFile: File;
  userId: number;
};
export type ContributionRequest = {
  projectId: number;
  amount: number;
  method: string; // paymentMethod
  qtyActionsBuy: number;
  userId?: number;
  invoiceFile: File;
};

export type Contribution = {
  id: number;
  amount: number;
  qtyPortions: number;
  projectId: number;
  contributorId: number;
  paymentId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Payment = {
  id: number;
  amount: number;
  method: string;
  status: string;
  transactionId: string;
  // userId: number;
  createdAt: Date;
  updatedAt: Date;
};
export interface CreateContributionWithPaymentResponse {
  contribution: Contribution;
  payment: Payment;
}

export interface ContributionByInvestorResponse {
  id: number;
  amount: number;
  qtyPortions: number;
  projectId: number;
  contributorId: number;
  paymentId: number;
  createdAt: Date;
  updatedAt: Date;
  project: {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: string;
    qtyPortions: number;
    valueByPortion: number;
    availablePortions: number;
    targetAmount: string;
    minimumAmount: string;
    riskLevel: number;
    financialInfoFile: string;
    rate: string;
    companyId: number;
    Company: {
      name: string;
    };
    createdAt: Date;
    updatedAt: Date;
  };
  payment: {
    id: number;
    amount: number;
    method: string;
    status: string;
    transactionId: string;
    invoiceFile: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
