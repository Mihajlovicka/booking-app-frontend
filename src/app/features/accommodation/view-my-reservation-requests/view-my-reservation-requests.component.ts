import { Component, Input } from '@angular/core';
import { EMPTY, switchMap, take } from 'rxjs';
import { Accommodation } from 'src/app/core/model/accommodation';
import { ReservationRequest } from 'src/app/core/model/reservation-request';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-view-my-reservation-requests',
  templateUrl: './view-my-reservation-requests.component.html',
  styleUrls: ['./view-my-reservation-requests.component.css']
})
export class ViewMyReservationRequestsComponent {
  public reservationRequests: ReservationRequest[] = [];

  public ngOnInit(): void {
    this.reservationService.getMyReservationRequests().pipe(take(1)).subscribe(
      data => {
        this.reservationRequests = data;
      }
    )
  }

  public constructor(
    private readonly reservationService: ReservationService
  ) { }

  public cancel(request: ReservationRequest): void {
    this.reservationService.reject(request.externalId)
      .pipe(
        switchMap(_ => {
          this.reservationService.getMyReservationRequests()
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
