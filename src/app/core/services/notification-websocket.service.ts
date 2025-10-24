import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../model/notification';
import { notificationBaseAPI, Path } from '../constant/path.enum';
import { UserService } from './user.service';


@Injectable({ providedIn: 'root' })
export class NotificationWebSocketService {
  private hubConnection: signalR.HubConnection;
  private _notifications = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this._notifications.asObservable();

  constructor(private userService: UserService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${notificationBaseAPI}ws/notifications`, {
        accessTokenFactory: async () => this.userService.getToken() ?? ''
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch((err) => console.error(err));

    this.hubConnection.on('ReceiveNotification', (notification: Notification) => {
      const current = this._notifications.value;
      this._notifications.next([notification, ...current]);
    });
  }

  // Add this helper
  setNotifications(notifications: Notification[]) {
    this._notifications.next(notifications);
  }

  markAllAsSeen() {
    const updated = this._notifications.value.map((n) => ({ ...n, seen: true }));
    this._notifications.next(updated);
  }

  markAsSeen(notification: Notification) {
    const updated = this._notifications.value.map((n) =>
      n.id === notification.id ? { ...n, seen: true } : n
    );
    this._notifications.next(updated);
  }

  getCurrentNotifications(): Notification[] {
    return this._notifications.value;
  }
}
