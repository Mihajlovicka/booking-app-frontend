import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, switchMap, take } from 'rxjs';
import { Accommodation } from 'src/app/core/model/accommodation';
import { ReservationRequest } from 'src/app/core/model/reservation-request';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-view-reservation-requests',
  templateUrl: './view-reservation-requests.component.html',
  styleUrls: ['./view-reservation-requests.component.css']
})
export class ViewReservationRequestsComponent implements OnInit {
  public reservationRequests: ReservationRequest[] = [];

  @Input() accommodation!: Accommodation;

  public ngOnInit(): void {
    this.reservationService.getAllReservationRequestsForAccommodation(this.accommodation.id)
      .pipe(take(1))
      .subscribe(
        data => {
          this.reservationRequests = data;
        }
      );
  }

  public constructor(
    private readonly reservationService: ReservationService
  ) { }

  public reject(requestionExternalId: string): void {
    this.reservationService.reject(this.accommodation.id, requestionExternalId)
      .pipe(
        switchMap(_ => {
          this.reservationService.getAllReservationRequestsForAccommodation(this.accommodation.id)
            .pipe(take(1))
            .subscribe(
              data => {
                this.reservationRequests = data;
              }
            );
          return EMPTY;
        }),
        take(1))
      .subscribe();
  }

  public accept(requestionExternalId: string): void {
    this.reservationService.accept(this.accommodation.id, requestionExternalId)
      .pipe(
        switchMap(_ => {
          this.reservationService.getAllReservationRequestsForAccommodation(this.accommodation.id)
            .pipe(take(1))
            .subscribe(
              data => {
                this.reservationRequests = data;
              }
            );
          return EMPTY;
        }),
        take(1))
      .subscribe();
  }
}
