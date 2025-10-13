import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from 'src/app/core/model/accommodation';
import { AccommodationService } from 'src/app/core/services/accommodation.service';

@Component({
  selector: 'app-info-accommodation',
  templateUrl: './info-accommodation.component.html',
  styleUrls: ['./info-accommodation.component.css']
})
export class InfoAccommodationComponent {

  accommodation: Accommodation | null = null;
  currentImageIndex = 0;
  selectedTab: 'info' | 'edit' | 'availability' = 'info';

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.accommodationService.getById(id).subscribe((data) => {
        this.accommodation = data;
      });
    }
  }

  nextImage() {
    if (this.accommodation?.pictures && this.currentImageIndex < this.accommodation.pictures.length - 1) {
      this.currentImageIndex++;
    }
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  reserve() {
    // open reservation dialog or navigate to reservation form
  }

  edit() {
    // navigate to edit form for this accommodation
  }

  onPriceTypeUpdate(event: any) {
    if (this.accommodation) {
      this.accommodation.priceType = event;
    }
  }
}
