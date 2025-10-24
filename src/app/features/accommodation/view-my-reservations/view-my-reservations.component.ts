import { Component, OnInit } from '@angular/core';
import { EMPTY, switchMap, take } from 'rxjs';
import { Reservation } from 'src/app/core/model/reservation';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReviewService } from 'src/app/core/services/review.service';
import { Review, ReviewFor, ViewHostAccommodationReviewDto } from 'src/app/core/model/review';

@Component({
  selector: 'app-view-my-reservations',
  templateUrl: './view-my-reservations.component.html',
  styleUrls: ['./view-my-reservations.component.css']
})
export class ViewMyReservationsComponent implements OnInit {
  public reservations: Reservation[] = [];

  public constructor(
    private readonly reservationService: ReservationService,
    private readonly dialog: MatDialog,
    private readonly reviewService: ReviewService
  ) { }

  public ngOnInit(): void {
    this.reservationService.getMyReservations()
      .pipe(take(1))
      .subscribe(
        data => {
          this.reservations = data;
        }
      );
  }

  public get upcomingReservations(): Reservation[] {
    return this.reservations.filter(r => this.isUpcoming(r));
  }

  public get pastOrOngoingReservations(): Reservation[] {
    return this.reservations.filter(r => this.isPast(r) || this.isOngoing(r));
  }

  public cancel(reservationId: number): void {
    this.reservationService.cancelReservation(reservationId)
      .pipe(
        switchMap(_ => {
          this.reservationService.getMyReservations()
            .pipe(take(1))
            .subscribe(
              data => {
                this.reservations = data;
              }
            );
          return EMPTY;
        }),
        take(1))
      .subscribe();
  }

  private getDateOnly(date: string | Date): Date {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  private isPast(reservation: Reservation): boolean {
    const endDate = this.getDateOnly(reservation.endDate);
    const today = this.getDateOnly(new Date());
    return endDate < today;
  }

  private isOngoing(reservation: Reservation): boolean {
    const startDate = this.getDateOnly(reservation.startDate);
    const endDate = this.getDateOnly(reservation.endDate);
    const today = this.getDateOnly(new Date());
    return startDate <= today && today <= endDate;
  }

  private isUpcoming(reservation: Reservation): boolean {
    const startDate = this.getDateOnly(reservation.startDate);
    const today = this.getDateOnly(new Date());
    return startDate > today;
  }

  public openReviewDialog(reservationId: number, accommodationExternalId: string): void {
    this.reviewService.getaccrater(accommodationExternalId)
      .pipe(take(1))
      .subscribe({
        next: (data: ViewHostAccommodationReviewDto | null) => {
          // Ako nema prethodnog review-a, stavimo default 0
          const item1Rating = data?.accommodationGrade ?? 0;
          const item2Rating = data?.hostGrade ?? 0;

          const dialogRef = this.dialog.open(AddReviewDialogComponent, {
            width: '350px',
            data: { item1Rating, item2Rating }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              const r1: Review = {
                grade: result.item1,
                reviewFor: ReviewFor.ACCOMMODATION,
                entityInfo: this.getAccommodationIdFromReservation(reservationId)
              };

              const r2: Review = {
                grade: result.item2,
                reviewFor: ReviewFor.HOST,
                entityInfo: this.getHostUsernameFromReservation(reservationId)
              };

              this.reviewService.addReview([r1, r2])
                .pipe(take(1))
                .subscribe(() => {
                  this.reservationService.getMyReservations()
                    .pipe(take(1))
                    .subscribe(data => this.reservations = data);
                });
            }
          });
        },
        error: (err) => {
          console.error('Failed to fetch rater review', err);
        }
      });
  }


  public onDeleteClick(id: string): void {

    this.reviewService.delete(id)
      .pipe(
        take(1),
        switchMap(_ => {
          return this.reservationService.getMyReservations();
        })
      )
      .subscribe({
        next: (data) => {
          this.reservations = data;
        },
        error: (err) => {
          console.error('Failed to delete review', err);
        }
      });
  }

  private getAccommodationIdFromReservation(reservationId: number): string {
    const reservation = this.reservations.find(r => r.id === reservationId);
    return reservation ? reservation.accommodationExternalId : "";
  }

  private getHostUsernameFromReservation(reservationId: number): string {
    const reservation = this.reservations.find(r => r.id === reservationId);
    return reservation ? reservation.hostUsername : "";
  }
}
