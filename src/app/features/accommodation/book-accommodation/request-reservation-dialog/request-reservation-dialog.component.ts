import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateReservationRequest } from 'src/app/core/model/reservation-request';

@Component({
  selector: 'app-request-reservation-dialog',
  templateUrl: './request-reservation-dialog.component.html',
  styleUrls: ['./request-reservation-dialog.component.css']
})
export class RequestReservationDialogComponent {
  public guestNum!: number;

  public constructor(
    public dialogRef: MatDialogRef<RequestReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateReservationRequest
  ) {
    this.guestNum = data.guestNumber ?? 0;
  }

  public onSave() {
    this.dialogRef.close({ action: 'save', numberOfGuests: this.guestNum });
  }

  public onCancel() {
    this.dialogRef.close({ action: 'cancel' });
  }
}
