import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { TransactionService } from '../../../../core/services/transaction.service';

@Component({
  selector: 'app-transaction-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss']
})
export class TransactionDialogComponent {
  transactionForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    this.transactionForm = this.fb.group({
      description: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      date: [today, [Validators.required]], 
      type: ['EXPENSE', [Validators.required]] 
    });

    if (this.data && this.data.id) {
      this.isEditMode = true;

      this.transactionForm.patchValue({
        description: this.data.description,
        amount: this.data.amount,
        date: this.data.date,
        type: this.data.type
      });
    }
  }

  onSave(): void {
    if (this.transactionForm.invalid) return;

    if (this.isEditMode) {

      this.transactionService.updateTransaction(this.data.id, this.transactionForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error updating', err)
      });
    } else {

      this.transactionService.createTransaction(this.transactionForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error creating', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}