import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

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
export class DashboardComponent {

  summary = {
    balance: 5430.50,
    incomes: 8200.00,
    expenses: 2769.50
  };

  displayedColumns: string[] = ['description', 'date', 'type', 'amount'];
  
  recentTransactions = [
    { description: 'Monthly Salary', date: new Date('2026-03-05'), type: 'INCOME', amount: 8200.00 },
    { description: 'Apartment Rent', date: new Date('2026-03-10'), type: 'EXPENSE', amount: 1500.00 },
    { description: 'Supermarket', date: new Date('2026-03-12'), type: 'EXPENSE', amount: 850.00 },
    { description: 'Internet Bill', date: new Date('2026-03-15'), type: 'EXPENSE', amount: 120.00 },
    { description: 'Steam Games', date: new Date('2026-03-20'), type: 'EXPENSE', amount: 299.50 }
  ];
}