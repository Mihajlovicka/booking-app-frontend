import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotificationType } from 'src/app/core/model/notification';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PopupHandlerService } from 'src/app/core/services/popup-handler.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit{
  @Output() changeTab = new EventEmitter<void>();

  allNotifications: NotificationType[] = [];
  choosenNotifications: NotificationType[] = [];

  constructor(
    private readonly service: NotificationService,
    private popupHandler: PopupHandlerService
  ) {
  }

  ngOnInit(): void {
      this.service.getAllByRole().subscribe({
        next: (data: NotificationType[]) => {
          this.allNotifications = data;
          this.service.getAllUserCurrent().subscribe({
            next: (data: NotificationType[]) => {
              this.choosenNotifications = data;
            }
          })
        }
      })
  }


  save() {
    this.service.save(this.choosenNotifications).subscribe({
      next: () => {
        this.popupHandler.openSnackbar(
          'Success',
          'success'
        );
        this.changeTab.emit();
      },
    });
  }

  compareFn(c1: NotificationType, c2: NotificationType): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
