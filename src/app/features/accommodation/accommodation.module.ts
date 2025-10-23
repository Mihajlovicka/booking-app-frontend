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
import { ViewReservationRequestsComponent } from './view-reservation-requests/view-reservation-requests.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon'; // već koristiš ikone za upload/delete
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ViewMyReservationRequestsComponent } from './view-my-reservation-requests/view-my-reservation-requests.component';
import { ViewMyReservationsComponent } from './view-my-reservations/view-my-reservations.component';

@NgModule({
  declarations: [
    CreateAccommodationComponent,
    AccommodationsListComponent,
    InfoAccommodationComponent,
    AvailabilityAccommodationComponent,
    BookAccommodationComponent,
    RequestReservationDialogComponent,
    ViewReservationRequestsComponent,
    ViewMyReservationRequestsComponent,
    ViewMyReservationsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AccmodationRoutingModule,
    FullCalendarModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class AccommodationModule { }
