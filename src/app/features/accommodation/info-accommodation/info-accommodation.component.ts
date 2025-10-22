import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Accommodation } from 'src/app/core/model/accommodation';
import { AccommodationService } from 'src/app/core/services/accommodation.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-info-accommodation',
  templateUrl: './info-accommodation.component.html',
  styleUrls: ['./info-accommodation.component.css']
})
export class InfoAccommodationComponent {
  accommodation: Accommodation | null = null;
  currentImageIndex = 0;
  selectedTab: 'info' | 'edit' | 'availability' | 'book' = 'info';

  public constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (this.isUserGuest()) {
        this.accommodationService.getByIdInfo(id).pipe(take(1)).subscribe({
          next: (data) => {
            this.accommodation = data;
          },
          error: () => {
            this.router.navigate(['/']);
          }
        });
      } else {
        this.accommodationService.getById(id).pipe(take(1)).subscribe({
          next: (data) => {
            this.accommodation = data;
          },
          error: () => {
            this.router.navigate(['/']);
          }
        });
      }
    }
  }

  public onReservationSaved(): void {
    this.selectedTab = 'info';
  }

  public nextImage(): void {
    if (this.accommodation?.pictures && this.currentImageIndex < this.accommodation.pictures.length - 1) {
      this.currentImageIndex++;
    }
  }

  public prevImage(): void {
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

  public onPriceTypeUpdate(event: any): void {
    if (this.accommodation) {
      this.accommodation.priceType = event;
    }
  }

  public isUserGuest(): boolean {
    return this.userService.isUserGuest();
  }
}
