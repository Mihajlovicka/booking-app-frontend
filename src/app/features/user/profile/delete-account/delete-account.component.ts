import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckDeleteAccount } from 'src/app/core/model/user';
import { PopupHandlerService } from 'src/app/core/services/popup-handler.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css'],
})
export class DeleteAccountComponent {
  requestDenied: boolean = false;

  constructor(
    private readonly service: UserService,
    private popupHandler: PopupHandlerService,
    private readonly router: Router
  ) {}

  deleteAccount() {
    this.service.checkDeleteAccount().subscribe({
      next: (data: CheckDeleteAccount) => {
        if (!data?.requestDenied) {
          this.service.deleteAccount().subscribe({
            next: (_) => {
              this.popupHandler.openSnackbar(
                'Account deleted',
                'success'
              );
              this.service.logout();
              this.router.navigate(['/auth/login']);
            },
          });
        } else {
          this.popupHandler.openSnackbar(
            'Cannot delete account. Reservations in progress!',
            'error'
          );
        }
      },
    });
  }
}
