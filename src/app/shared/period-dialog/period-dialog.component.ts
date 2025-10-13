import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AvailabilityPeriod } from 'src/app/core/model/availability-period';


@Component({
  selector: 'app-period-dialog',
  templateUrl: './period-dialog.component.html',
  styleUrls: ['./period-dialog.component.css']
})
export class PeriodDialogComponent {
price!: number;

  constructor(
    public dialogRef: MatDialogRef<PeriodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AvailabilityPeriod
  ) {
    this.price = data.price ?? 0;
  }

  onSave() {
    this.dialogRef.close({ action: 'save', price: this.price });
  }

  onCancel() {
    this.dialogRef.close({ action: 'cancel' });
  }

  onDelete() {
    this.dialogRef.close({ action: 'delete' });
  }
}
