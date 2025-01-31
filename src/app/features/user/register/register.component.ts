import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserRole } from 'src/app/core/model/user-role';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles: string[] = Object.values(UserRole);
  currentStep = 1;

  constructor(
    private readonly service: UserService,
    private readonly router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      role: [UserRole.GUEST, Validators.required],
      password: ['', Validators.required],
      address: this.fb.group({
        streetNumber: ['', Validators.required],
        streetName: ['', Validators.required],
        city: ['', Validators.required],
        postNumber: [''],
        country: [''],
      }),
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.service.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  get addressControls() {
    return (this.registerForm.get('address') as FormGroup)?.controls;
  }

  goToNextStep() {
    if (
      this.registerForm.get('firstName')?.valid &&
      this.registerForm.get('lastName')?.valid
    ) {
      this.currentStep = 2;
    }
  }

  goToPreviousStep() {
    this.currentStep = 1;
  }
}
