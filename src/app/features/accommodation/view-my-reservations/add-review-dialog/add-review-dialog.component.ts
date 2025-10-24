import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.css']
})
export class AddReviewDialogComponent implements OnInit {
  @Input() item1Rating?: number;
  @Input() item2Rating?: number;

  public currentItem1Rating = 0;
  public currentItem2Rating = 0;

  public constructor(
    private dialogRef: MatDialogRef<AddReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item1Rating: number, item2Rating: number }
  ) { }

  ngOnInit(): void {
    this.currentItem1Rating = this.data.item1Rating ?? 0;
    this.currentItem2Rating = this.data.item2Rating ?? 0;
  }

  public setRating(item: 'item1' | 'item2', value: number) {
    if (item === 'item1') {
      this.currentItem1Rating = value;
    } else {
      this.currentItem2Rating = value;
    }
  }

  public disableSubmit(): boolean {
    return this.currentItem1Rating === 0 || this.currentItem2Rating === 0;
  }

  public submit() {
    this.dialogRef.close({ item1: this.currentItem1Rating, item2: this.currentItem2Rating });
  }

  public close() {
    this.dialogRef.close(null);
  }
}
