import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { AccmodationRoutingModule } from './accommodation-routing.module';
import { InfoAccommodationComponent } from './info-accommodation/info-accommodation.component';
import { AccommodationsListComponent } from './accommodations-list/accommodations-list.component';
import { AvailabilityAccommodationComponent } from './availability-accommodation/availability-accommodation.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BookAccommodationComponent } from './book-accommodation/book-accommodation.component';
import { RequestReservationDialogComponent } from './book-accommodation/request-reservation-dialog/request-reservation-dialog.component';

@NgModule({
  declarations: [
    CreateAccommodationComponent,
    AccommodationsListComponent,
    InfoAccommodationComponent,
    AvailabilityAccommodationComponent,
    BookAccommodationComponent,
    RequestReservationDialogComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AccmodationRoutingModule  ,
    FullCalendarModule
  ]
})
export class AccommodationModule { }
