import { Component, Input, OnInit } from '@angular/core';
import { Review, ViewHostAccommodationReviewDto } from 'src/app/core/model/review';
import { ReviewService } from 'src/app/core/services/review.service';
import { UserService } from 'src/app/core/services/user.service';
import { AddReviewDialogComponent } from '../view-my-reservations/add-review-dialog/add-review-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-accommodation-reviews',
  templateUrl: './accommodation-reviews.component.html',
  styleUrls: ['./accommodation-reviews.component.css']
})
export class AccommodationReviewsComponent implements OnInit {
  @Input() accommodationId: string | undefined;

  public review: ViewHostAccommodationReviewDto[] = [];

  public constructor(
    private readonly reviewService: ReviewService,
    private readonly userService: UserService,
    private readonly dialog: MatDialog) { }

  public ngOnInit(): void {
    if (this.accommodationId) {
      this.reviewService.allGradesForAccommodationView(this.accommodationId).subscribe(
        data => {
          this.review = data;
        }
      );
    }
  }

  public editable(r: ViewHostAccommodationReviewDto): boolean {
    return r.raterUserName === this.userService.getLoggedUsername();
  }

  public onReviewClick(r: ViewHostAccommodationReviewDto) {
    if (r.raterUserName === this.userService.getLoggedUsername()) {
      const dialogRef = this.dialog.open(AddReviewDialogComponent, {
        width: '350px',
        data: { item1Rating: r.accommodationGrade, item2Rating: r.hostGrade }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {

          const r1 = {
            grade: result.item1,
            reviewFor: 'ACCOMMODATION',
            entityInfo: r.accommodationExternalId
          } as Review;

          const r2 = {
            grade: result.item2,
            reviewFor: 'HOST',
            entityInfo: r.hostUsername
          } as Review;

          this.reviewService.addReview([r1, r2])
            .pipe(
              take(1))
            .subscribe(
              _ => {
                this.reviewService.allGradesForAccommodationView(this.accommodationId!).subscribe(
                  data => {
                    this.review = data;
                  });
              }
            );
        }
      });
    }
  }

  public onDeleteClick(r: ViewHostAccommodationReviewDto) {
    if (r.raterUserName === this.userService.getLoggedUsername()) {
      this.reviewService.delete(r.accommodationExternalId)
        .pipe(
          take(1),
          switchMap(_ => {
            return this.reviewService.allGradesForAccommodationView(this.accommodationId!);
          })
        )
        .subscribe(
          data => {
            this.review = data;
          }
        );
    }
  }
}
