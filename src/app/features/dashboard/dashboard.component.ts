import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { DashboardService, DashboardSummary } from '../../core/services/dashboard.service';
import { TransactionService, Transaction } from '../../core/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  summary: DashboardSummary = {
    balance: 0,
    totalIncome: 0,
    totalExpense: 0
  };

  displayedColumns: string[] = ['description', 'date', 'type', 'amount'];
  recentTransactions: Transaction[] = [];

  constructor(
    private dashboardService: DashboardService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Find the card totals
    this.dashboardService.getSummary().subscribe({
      next: (data) => {
        console.log('DADOS REAIS DO DASHBOARD:', data);
        this.summary = data;
      },
      error: (err) => {
        console.error('Error loading dashboard summary', err);
      }
    });

    // Retrieve the list of transactions for the table
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.recentTransactions = data;
      },
      error: (err) => {
        console.error('Error loading transactions', err);
      }
    });
  }
}