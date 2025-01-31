import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { delay, map, Observable, of } from 'rxjs';
import { PopupHandlerService } from 'src/app/core/services/popup-handler.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  passForm: FormGroup;
  @Output() changeTab = new EventEmitter<void>();

  constructor(
    private readonly service: UserService,
    private fb: FormBuilder,
    private popupHandler: PopupHandlerService
  ) {
    this.passForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        asyncValidators: [this.asyncPasswordsMatchValidator],
        updateOn: 'change',
      }
    );
  }

  private asyncPasswordsMatchValidator(
    group: AbstractControl
  ): Observable<ValidationErrors | null> {
    return of(group).pipe(
      delay(300),
      map(() => {
        const newPassword = group.get('newPassword')?.value;
        const confirmPasswordControl = group.get('confirmPassword');

        if (
          newPassword &&
          confirmPasswordControl &&
          newPassword !== confirmPasswordControl.value
        ) {
          confirmPasswordControl.setErrors({ passwordsDoNotMatch: true });
          return { passwordsDoNotMatch: true };
        }
        return null;
      })
    );
  }

  onSubmit() {
    if (this.passForm.invalid) return;
    this.service.changePassword(this.passForm.value).subscribe({
      next: () => {
        this.popupHandler.openSnackbar(
          'Password changed successfully',
          'success'
        );
        this.changeTab.emit();
      },
    });
  }

  get f() {
    return this.passForm.controls;
  }
}
