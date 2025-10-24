import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Path } from '../constant/path.enum';
import { Accommodation, CreateAccommodation, Equipment } from '../model/accommodation';
import { PriceType } from '../model/availability-period';
import { NotificationType, Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public constructor(private http: HttpClient) { }

  public getAllByRole(): Observable<NotificationType[]> {
    return this.http.get<NotificationType[]>(`${Path.Notification}/types`);
  }

  public getAllUserCurrent(): Observable<NotificationType[]> {
    return this.http.get<NotificationType[]>(`${Path.Notification}/typesByUser`);
  }

  public save(notifications: NotificationType[]): Observable<NotificationType[]> {
    return this.http.post<NotificationType[]>(`${Path.Notification}`, notifications);
  }

  public oldNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${Path.Notification}/oldNotifications`);
  }

  public updateOldNotifications(notifications: Notification[]): Observable<Notification[]> {
    return this.http.post<Notification[]>(`${Path.Notification}/updateOldNotifications`, notifications);
  }


}
