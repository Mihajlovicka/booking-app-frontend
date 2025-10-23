import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccommodationsListComponent } from "./accommodations-list/accommodations-list.component";
import { InfoAccommodationComponent } from "./info-accommodation/info-accommodation.component";
import { ViewMyReservationRequestsComponent } from "./view-my-reservation-requests/view-my-reservation-requests.component";
import { ViewMyReservationsComponent } from "./view-my-reservations/view-my-reservations.component";

const routes: Routes = [
  {
    path: "",
    component: AccommodationsListComponent
  },
  {
    path: "reservation-requests",
    component: ViewMyReservationRequestsComponent
  },
  {
    path: "reservations",
    component: ViewMyReservationsComponent
  },
  {
    path: ":id",
    component: InfoAccommodationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccmodationRoutingModule {}
