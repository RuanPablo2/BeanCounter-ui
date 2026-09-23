import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

import {
  DashboardService,
  DashboardSummary,
} from '../../core/services/dashboard.service';
import {
  TransactionService,
  Transaction,
} from '../../core/services/transaction.service';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary = {
    balance: 0,
    totalIncome: 0,
    totalExpense: 0,
  };

  smartInput: string = '';
  isProcessingAi: boolean = false;

  displayedColumns: string[] = [
    'description',
    'category',
    'date',
    'type',
    'amount',
    'actions',
  ];

  dataSource = new MatTableDataSource<Transaction>([]);

  startDate: Date | null = null;
  endDate: Date | null = null;

  uniqueCategories: string[] = [];
  selectedCategory: string = '';
  searchText: string = '';

  constructor(
    private dashboardService: DashboardService,
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private themeService: ThemeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  loadDashboardData(): void {
    const startStr = this.startDate
      ? this.formatDate(this.startDate)
      : undefined;
    const endStr = this.endDate ? this.formatDate(this.endDate) : undefined;

    this.dashboardService.getSummary(startStr, endStr).subscribe({
      next: (data) => (this.summary = data),
      error: (err) => console.error('Error loading dashboard summary', err),
    });

    this.transactionService.getTransactions(startStr, endStr).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.extractCategories(data);
      },
      error: (err) => console.error('Error loading transactions', err),
    });
  }

  private extractCategories(transactions: Transaction[]): void {
    const allCategories = transactions
      .map(t => t.category)
      .filter((c): c is string => !!c && c.trim() !== '');
    
    this.uniqueCategories = [...new Set(allCategories)].sort(); 
  }

  filterByCategory(category: string): void {
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
      this.dataSource.filter = this.searchText.trim().toLowerCase();
    } else {
      this.selectedCategory = category;
      this.dataSource.filter = category.toLowerCase();
    }
  }

  onDateChange(): void {
    if (this.startDate && this.endDate) {
      this.loadDashboardData();
    }
  }

  clearFilter(): void {
    this.startDate = null;
    this.endDate = null;
    this.loadDashboardData();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchText = filterValue;
    this.selectedCategory = '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  processarIA(): void {
    if (!this.smartInput.trim()) return;

    this.isProcessingAi = true;
    this.transactionService.createSmartTransaction(this.smartInput).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'OK', { duration: 5000 });
        this.smartInput = '';
        this.isProcessingAi = false;
        this.loadDashboardData(); 
      },
      error: (err) => {
        console.error('Erro ao processar IA', err);
        this.snackBar.open('Erro ao processar o texto com a IA.', 'Fechar', { duration: 3000 });
        this.isProcessingAi = false;
      }
    });
  }

  deleteTransaction(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => this.loadDashboardData(),
        error: (err) => console.error('Error deleting transaction', err),
      });
    }
  }

  editTransaction(transaction: Transaction): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      disableClose: true,
      data: transaction,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) this.loadDashboardData();
    });
  }

  openNewTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) this.loadDashboardData();
    });
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    localStorage.removeItem('jwt_token');

    if (this.isDarkMode()) {
      this.toggleTheme();
    }

    this.router.navigate(['/login']);
  }
}