import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Path } from '../constant/path.enum';
import { CreateReservationRequest, ReservationRequest } from '../model/reservation-request';
import { ReservationDto } from '../model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  public constructor(private http: HttpClient) { }

  public createReservationRequest(dto: CreateReservationRequest): Observable<void> {
    return this.http.post<void>(`${Path.Booking}/reservation-requests`, dto);
  }

  public getReservationsByAccommodation(accommodationId: string): Observable<ReservationDto[]> {
    return this.http.get<ReservationDto[]>(
      `${Path.Booking}accommodations/${accommodationId}/reservations`
    );
  }

  public getAllReservationRequestsForAccommodation(accommodationId: string): Observable<ReservationRequest[]>   {
    return this.http.get<ReservationRequest[]>(
       `${Path.Booking}reservation-requests/${accommodationId}`
      );
  }

  public reject(reservationRequestId: string): Observable<void> {
    return this.http.delete<void>(`${Path.Booking}reservation-requests/${reservationRequestId}`);
  }

  public accept(reservationRequestId: string): Observable<void> {
    return this.http.post<void>(`${Path.Booking}reservation-requests/${reservationRequestId}`,{});
  }

  public getMyReservationRequests(): Observable<ReservationRequest[]> {
    return this.http.get<ReservationRequest[]>(`${Path.Booking}reservation-requests`);
  }
}
