import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.css']
})
export class AddReviewDialogComponent {
  public item1Rating = 0;
  public item2Rating = 0;

  public constructor(private dialogRef: MatDialogRef<AddReviewDialogComponent>) {}

  public setRating(item: 'item1' | 'item2', value: number) {
    if(item === 'item1') this.item1Rating = value;
    if(item === 'item2') this.item2Rating = value;
  }

  public disableSubmit(): boolean {
    return this.item1Rating === 0 || this.item2Rating === 0;
  }

  public submit() {
    this.dialogRef.close({ item1: this.item1Rating, item2: this.item2Rating });
  }

  public close() {
    this.dialogRef.close(null);
  }
}
