import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Accommodation } from 'src/app/core/model/accommodation';
import { AvailabilityFilter } from 'src/app/core/model/availability-filter';
import { PriceType } from 'src/app/core/model/availability-period';
import { AvailabilityService } from 'src/app/core/services/availability.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  accommodations: Accommodation[] = [];
  filterForm: FormGroup;

  constructor(
    private router: Router,
    private readonly availabilityService: AvailabilityService,
    private fb: FormBuilder
  ) {
     this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      address: [''],
      numberOfGuests: [1]
    });
   }

  ngOnInit(): void {
    this.search();
  }

  search(filter?: AvailabilityFilter) {
      this.availabilityService.search(filter).subscribe({
        next: (data: Accommodation[]) => {
          this.accommodations = data;
        }
      });
      this.availabilityService.not_found().subscribe({
        next: () => {
        }
      });
    }

      applyFilter() {
    const filter: AvailabilityFilter = this.filterForm.value;
    this.search(filter);
  }

  resetFilter() {
    this.filterForm.reset({ numberOfGuests: 1 });
    this.search();
  }

  openDetails(id: string) {
    this.router.navigate(['/accommodation', id]);
  }
}
