import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { AvailabilityPeriod } from 'src/app/core/model/availability-period';
import { AvailabilityService } from 'src/app/core/services/availability.service';
import { RequestReservationDialogComponent } from './request-reservation-dialog/request-reservation-dialog.component';
import { CreateReservationRequest } from 'src/app/core/model/reservation-request';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { ReservationDto } from 'src/app/core/model/reservation';
import { forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-book-accommodation',
  templateUrl: './book-accommodation.component.html'
})
export class BookAccommodationComponent implements OnInit {
  private reservations: ReservationDto[] = [];
  private availablePeriods: AvailabilityPeriod[] = [];

  @Input() accommodationId: string | undefined;
  @Input() priceType: string | undefined;
  @Output() reservationSaved = new EventEmitter<void>();

  public constructor(
    private readonly availabilityService: AvailabilityService,
    private readonly reservationService: ReservationService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    if (!this.accommodationId) return;

    forkJoin({
      reservations: this.reservationService.getReservationsByAccommodation(this.accommodationId).pipe(take(1)),
      periods: this.availabilityService.getPeriods(this.accommodationId, true)
    }).subscribe(({ reservations, periods }) => {
      this.reservations = reservations;

      this.availablePeriods = periods.filter(period => {
        return !this.reservations.some(reservation => {
          return !(period.endDate < reservation.startDate || period.startDate > reservation.endDate);
        });
      });

      this.availablePeriods = [];

      for (const p of periods) {
        let freeSegments: AvailabilityPeriod[] = [{
          ...p,
          startDate: p.startDate,
          endDate: p.endDate
        }];

        for (const r of reservations) {
          freeSegments = freeSegments.flatMap(segment => {
            if (segment.endDate <= r.startDate || segment.startDate >= r.endDate) {
              return [segment];
            }

            const newSegments: AvailabilityPeriod[] = [];

            // deo pre rezervacije
            if (segment.startDate < r.startDate) {
              newSegments.push({
                ...segment,
                startDate: segment.startDate,
                endDate: r.startDate
              });
            }

            if (segment.endDate > r.endDate) {
              newSegments.push({
                ...segment,
                startDate: r.endDate,
                endDate: segment.endDate
              });
            }

            return newSegments;
          });
        }

        this.availablePeriods.push(...freeSegments);
      }


      this.calendarOptions.events = this.availablePeriods.map(p => ({
        title: `$${p.price}-${this.priceType}`,
        id: p.id?.toString(),
        start: p.startDate,
        end: p.endDate,
        allDay: true,
        display: 'background',
        backgroundColor: '#16a34a'
      }));
    });
  }

  public calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, multiMonthPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    editable: false,
    weekends: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,multiMonthYear',
    },
    validRange: {
      start: this.getToday()
    },
    views: {
      multiMonthYear: {
        type: 'multiMonthYear',
        duration: { months: 12 },
      },
    },
    selectAllow: this.allowSelectionOnlyInAvailablePeriods.bind(this),
    select: this.handleDateSelect.bind(this),
    events: []
  };

  private getToday(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    console.log(`${yyyy}-${mm}-${dd}`);
    return `${yyyy}-${mm}-${dd}`;
  }

  private handleDateSelect(selectInfo: DateSelectArg) {
    if (this.accommodationId) {
      const dialogRef = this.dialog.open(RequestReservationDialogComponent, {
        width: '400px',
        data: {
          startDate: selectInfo.startStr,
          endDate: selectInfo.endStr,
          guestNumber: 0
        } as CreateReservationRequest
      });

      dialogRef.afterClosed().subscribe(result => {
        if (!result || result.action !== 'save') return;
        const dto = {
          startDate: selectInfo.startStr,
          endDate: selectInfo.endStr,
          guestNumber: result.numberOfGuests,
          accommodationExternalId: this.accommodationId
        } as CreateReservationRequest;

        this.reservationService
          .createReservationRequest(this.accommodationId!, dto)
          .subscribe(_ => {
            this.reservationSaved.emit();
          });
      });
    }
  }

  private allowSelectionOnlyInAvailablePeriods(selectInfo: any): boolean {
    const start = selectInfo.startStr;
    let end = selectInfo.endStr;

    const endDate = new Date(end);
    endDate.setDate(endDate.getDate());
    end = endDate.toISOString().split('T')[0];

    return this.availablePeriods.some(period => {
      const periodStart = period.startDate;
      const periodEnd = period.endDate;

      return start >= periodStart && end <= periodEnd;
    });
  }
}
