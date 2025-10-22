import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccommodationsListComponent } from "./accommodations-list/accommodations-list.component";
import { InfoAccommodationComponent } from "./info-accommodation/info-accommodation.component";

const routes: Routes = [
  {
    path: "",
    component: AccommodationsListComponent
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
