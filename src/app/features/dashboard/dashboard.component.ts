import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DashboardService, DashboardSummary } from '../../core/services/dashboard.service';
import { TransactionService, Transaction } from '../../core/services/transaction.service';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';

import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule 
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

  displayedColumns: string[] = ['description', 'date', 'type', 'amount', 'actions'];
  
  dataSource = new MatTableDataSource<Transaction>([]);

  constructor(
    private dashboardService: DashboardService,
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getSummary().subscribe({
      next: (data) => this.summary = data,
      error: (err) => console.error('Error loading dashboard summary', err)
    });

    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Error loading transactions', err)
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteTransaction(id: number): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => this.loadDashboardData(),
        error: (err) => console.error('Error deleting transaction', err)
      });
    }
  }

  editTransaction(transaction: Transaction): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      disableClose: true,
      data: transaction
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) this.loadDashboardData(); 
    });
  }

  openNewTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) this.loadDashboardData(); 
    });
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}