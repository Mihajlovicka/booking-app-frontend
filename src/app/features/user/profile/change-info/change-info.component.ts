import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupHandlerService } from 'src/app/core/services/popup-handler.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css'],
})
export class ChangeInfoComponent {
  userForm: FormGroup;
  currentStep = 1;

  constructor(
    private readonly service: UserService,
    private popupHandler: PopupHandlerService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      address: this.fb.group({
        streetNumber: ['', Validators.required],
        streetName: ['', Validators.required],
        city: ['', Validators.required],
        postNumber: [''],
        country: [''],
      }),
    });
    service.getLogged().subscribe((user) => {
      this.userForm.patchValue(user);
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    this.service.save(this.userForm.value).subscribe({
      next: () => {
        this.popupHandler.openSnackbar(
          'User information changed successfully',
          'success'
        );
        this.currentStep = 1;
      },
    });
  }

  get f() {
    return this.userForm.controls;
  }

  get addressControls() {
    return (this.userForm.get('address') as FormGroup)?.controls;
  }

  goToNextStep() {
    if (
      this.userForm.get('firstName')?.valid &&
      this.userForm.get('lastName')?.valid
    ) {
      this.currentStep = 2;
    }
  }

  goToPreviousStep() {
    this.currentStep = 1;
  }
}
