import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Accommodation, CreateAccommodation } from 'src/app/core/model/accommodation';
import { AccommodationService } from 'src/app/core/services/accommodation.service';

@Component({
  selector: 'app-accommodations-list',
  templateUrl: './accommodations-list.component.html',
  styleUrls: ['./accommodations-list.component.css']
})
export class AccommodationsListComponent {
  router = inject(Router);
  selectedTab: string = 'all';
  
  accommodations: Accommodation[] = [];
  
  constructor(
    private accommodationService: AccommodationService
  ) {}
  
  ngOnInit() {
    this.load();
  }

  load(){
    this.accommodationService.getAllByUser().subscribe((data) => {
      this.accommodations = data;
    });
  }

  openDetails(id: string) {
    this.router.navigate(['/accommodations', id]);
  }

  changeTab(event: string){
    this.selectedTab = event;
    this.load();
  }

}
