import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Address, CreateAccommodation, Equipment } from 'src/app/core/model/accommodation';
import { AccommodationService } from 'src/app/core/services/accommodation.service';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent implements OnInit {
  @Output() changeTab = new EventEmitter<any>();
  accommodationForm!: FormGroup;
  currentStep = 1;
  previewUrls: (string | ArrayBuffer)[] = [];
  currentImageIndex = 0;
  items: Equipment[] = [];
  filteredOptions: Equipment[] = [];
  selectedItems: Equipment[] = [];
  inputValue: string = '';

  public constructor(
    private readonly fb: FormBuilder,
    private readonly accommodationService: AccommodationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.loadItemsFromBackend();

    this.accommodationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      minNumberOfGuests: [0, [Validators.required, Validators.min(0)]],
      maxNumberOfGuests: [undefined, [Validators.required, Validators.min(1)]],
      equipment: [[]],
      pictures: [[]],
      streetNumber: ['', [Validators.required, Validators.maxLength(100)]],
      streetName: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      postNumber: ['', [Validators.required, Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  public get f() {
    return this.accommodationForm.controls;
  }

  public nextStep(): void {
    if (this.currentStep === 1) {
      const step1Fields = ['name', 'description', 'minNumberOfGuests', 'maxNumberOfGuests'];
      const step1Valid = step1Fields.every((field) => this.accommodationForm.get(field)?.valid);
      if (!step1Valid) {
        this.accommodationForm.markAllAsTouched();
        return;
      }
    }
    if (this.currentStep === 2) {
      const step2Fields = ['streetNumber', 'streetName', 'city', 'postNumber', 'country'];
      const step2Valid = step2Fields.every((field) => this.accommodationForm.get(field)?.valid);
      if (!step2Valid) {
        this.accommodationForm.markAllAsTouched();
        return;
      }
    }
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }


  public prevStep(): void {
    this.currentStep--;
  }

  public onSubmit(): void {
    if (this.accommodationForm.invalid) {
      return;
    }
    const accommodation = {
      name: this.accommodationForm.value.name,
      description: this.accommodationForm.value.description,
      minNumberOfGuests: this.accommodationForm.value.minNumberOfGuests,
      maxNumberOfGuests: this.accommodationForm.value.maxNumberOfGuests,
      equipment: this.accommodationForm.value.equipment,
      address: {
        streetName: this.accommodationForm.value.streetName,
        streetNumber: this.accommodationForm.value.streetNumber,
        city: this.accommodationForm.value.city,
        country: this.accommodationForm.value.country,
        postNumber: this.accommodationForm.value.postNumber
      } as Address,
      pictureUrls: this.accommodationForm.value.pictures
    } as CreateAccommodation;
    this.accommodationService.saveAccommodation(accommodation).subscribe({
      next: () => {
        console.log('Accommodation saved successfully!');

        this.changeTab.next('all')
      },
      error: (error) => {
        console.log('Error response:', error.error?.message); // Log the full error response for debugging
        // Check if the error is related to name uniqueness
        if (error.status === 500 && error.error?.message === 'Accommodation name must be unique') {
          // Reset the form and set the current step back to 1
          alert(error.error?.message); // Optionally show an alert with the error message
          this.currentStep = 1;  // Go back to step 1
        } else {
          // Handle other errors
          console.error('An unexpected error occurred:', error);
        }
      }
    });
  }


  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const base64Url = reader.result as string;
          if (!this.previewUrls.includes(base64Url)) {
            this.previewUrls.push(base64Url);
            this.accommodationForm.controls['pictures'].setValue(this.previewUrls);
          } else {
            console.warn('This picture already exists and will not be added.');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }

  public nextImage() {
    if (this.currentImageIndex < this.previewUrls.length - 1) {
      this.currentImageIndex++;
    }
  }

  public prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  public loadItemsFromBackend() {
    this.accommodationService.getEquipment()
    .pipe(take(1))
    .subscribe( data => {
      this.items = data;
    });

    this.filteredOptions = [...this.items];
  }

  public filterOptions(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredOptions = this.items.filter(option =>
      option.name.toLowerCase().includes(query)
    );
  }

  public onSelectionChange(option: Equipment, event: any): void {
    if (event.checked) {
      console.log('Adding option:', option);
      this.selectedItems.push(option);
    } else {
      const index = this.selectedItems.indexOf(option);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    }
    console.log('Selected items:', this.selectedItems);
    this.accommodationForm.controls['equipment'].setValue(this.selectedItems);
  }

  public deleteImage(index: number): void {
    this.previewUrls.splice(index, 1);
    if (this.currentImageIndex >= this.previewUrls.length) {
      this.currentImageIndex = this.previewUrls.length - 1;
    }
  }
}
