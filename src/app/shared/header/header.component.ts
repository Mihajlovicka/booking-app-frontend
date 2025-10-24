import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, map, Observable } from 'rxjs';
import { NotificationWebSocketService } from 'src/app/core/services/notification-websocket.service';
import { UserService } from 'src/app/core/services/user.service';
import { Notification } from 'src/app/core/model/notification';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  notifications$: Observable<Notification[]>;
  unseenCount$: Observable<number>;
  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationWebSocketService,
    private notificationEndpointService: NotificationService
  ) {
    this.notifications$ = this.notificationService.notifications$;
    this.unseenCount$ = this.notifications$.pipe(
      map((notifications) => notifications.filter((n) => !n.seen).length)
    );
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.notificationEndpointService.oldNotifications().subscribe({
        next: async (data: Notification[]) => {
          const current = await firstValueFrom(
            this.notificationService.notifications$
          );
          this.notificationService.setNotifications([...data, ...current]);
        },
        error: (err) => console.error(err),
      });

    }
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  isUserGuest() {
    return this.userService.isUserGuest();
  }

  home() {
    this.router.navigate(['']);
  }

  reservationRequests() {
    this.router.navigate(['accommodations/reservation-requests']);
  }

  reservations() {
    this.router.navigate(['accommodations/reservations']);
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    // Save seen notifications first
    const allNotifications = this.notificationService.getCurrentNotifications();
    this.notificationEndpointService.updateOldNotifications(allNotifications).subscribe({
      next: () => {
        console.log('Notifications saved before logout');
        // Proceed with logout
        this.userService.logout();
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Failed to save notifications before logout', err);
        // Still logout even if saving fails
        this.userService.logout();
        this.router.navigate(['/auth/login']);
      }
    });
  }


  register() {
    this.router.navigate(['/auth/register']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  accommodation() {
    this.router.navigate(['/accommodations']);
  }

  onNotificationClick(notif: Notification) {
    this.notificationService.markAsSeen(notif);
    // Optional: navigate or do something with notification
  }
}
