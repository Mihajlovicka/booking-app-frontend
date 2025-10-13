import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvailabilityPeriod, PriceType, priceTypes } from 'src/app/core/model/availability-period';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
} from '@fullcalendar/core';
import { AvailabilityService } from 'src/app/core/services/availability.service';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { AccommodationService } from 'src/app/core/services/accommodation.service';
import { PopupHandlerService } from 'src/app/core/services/popup-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { PeriodDialogComponent } from 'src/app/shared/period-dialog/period-dialog.component';

@Component({
  selector: 'app-availability-accommodation',
  templateUrl: './availability-accommodation.component.html',
  styleUrls: ['./availability-accommodation.component.css'],
})
export class AvailabilityAccommodationComponent {
  @Input() accommodationId!: string;
  @Input() priceTypeSelected!: PriceType;
  @Output() priceTypeChange = new EventEmitter<any>();
  priceTypes = priceTypes;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, multiMonthPlugin],
    initialView: 'dayGridMonth',
    selectable: true, 
    editable: true, 
    weekends: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,multiMonthYear',
    },
    views: {
      multiMonthYear: {
        type: 'multiMonthYear',
        duration: { months: 12 },
      },
    },
    events: [{ title: 'Meeting', start: new Date() }],
    select: this.handleDateSelect.bind(this), 
    eventClick: this.handleEventClick.bind(this),
  };

  periods: AvailabilityPeriod[] = [];
  events: any[] = [];

  constructor(private availabilityService: AvailabilityService, 
    private readonly accommodationService: AccommodationService,
    private popupHandler: PopupHandlerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadPeriods();
  }

  loadPeriods() {
    this.availabilityService
      .getPeriods(this.accommodationId)
      .subscribe((data) => {
        this.periods = data;
        this.events = this.periods?.map((p) => ({
          id: p.id?.toString(),
          title: `$${p.price}`,
          start: p.startDate,
          end: p.endDate,
          allDay: true,
        }));

        this.calendarOptions = {
          ...this.calendarOptions,
          events: this.events,
        };
      });
  }

handleDateSelect(selectInfo: DateSelectArg) {
  const dialogRef = this.dialog.open(PeriodDialogComponent, {
    width: '400px',
    data: {
      startDate: selectInfo.startStr,
      endDate: selectInfo.endStr,
      price: 0
    } as AvailabilityPeriod
  });

  dialogRef.afterClosed().subscribe(result => {
    if (!result || result.action !== 'save') return;

    const dto = {
      startDate: selectInfo.startStr,
      endDate: selectInfo.endStr,
      price: result.price
    };

    this.availabilityService
      .addPeriod(this.accommodationId, dto)
      .subscribe(() => this.loadPeriods());
  });
}

// For clicking an existing period
handleEventClick(clickInfo: EventClickArg) {
  const period = this.periods.find(p => p.id?.toString() === clickInfo.event.id);
  if (!period) return;

  const dialogRef = this.dialog.open(PeriodDialogComponent, {
    width: '400px',
    data: {
      startDate: period.startDate,
      endDate: period.endDate,
      price: period.price,
      id: period.id
  } as AvailabilityPeriod });

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return;

    if (result.action === 'save') {
      const dto = {
        startDate: period.startDate,
        endDate: period.endDate,
        price: result.price,
        id: period.id
      };
      this.availabilityService
        .addPeriod(this.accommodationId, dto)
        .subscribe(() => this.loadPeriods());

    } else if (result.action === 'delete') {
      this.availabilityService
        .deletePeriod(this.accommodationId, period.id!)
        .subscribe(() => this.loadPeriods());
    }
  });
}

  onPriceTypeChange() {
    this.accommodationService.updatePriceType(this.accommodationId, this.priceTypeSelected).subscribe({
      next: () => {
      this.popupHandler.openSnackbar(
        'Price type changed successfully',
        'success'
      );
      this.priceTypeChange.emit(this.priceTypeSelected);
      },
    });
  }
}
