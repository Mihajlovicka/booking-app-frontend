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

  public createReservationRequest(accommodationId: string, dto: CreateReservationRequest): Observable<void> {
    return this.http.post<void>(`${Path.Booking}accommodations/${accommodationId}/reservation-requests`, dto);
  }

  public getReservationsByAccommodation(accommodationId: string): Observable<ReservationDto[]> {
    return this.http.get<ReservationDto[]>(
      `${Path.Booking}accommodations/${accommodationId}/reservations`
    );
  }

  public getAllReservationRequestsForAccommodation(accommodationId: string): Observable<ReservationRequest[]>   {
    return this.http.get<ReservationRequest[]>(
       `${Path.Booking}accommodations/${accommodationId}/reservation-requests`
      );
  }

  public reject(accommodationId: string, reservationRequestId: string): Observable<void> {
    return this.http.delete<void>(`${Path.Booking}accommodations/${accommodationId}/reservation-requests/${reservationRequestId}`);
  }

  public accept(accommodationId: string, reservationRequestId: string): Observable<void> {
    return this.http.post<void>(`${Path.Booking}accommodations/${accommodationId}/reservation-requests/${reservationRequestId}`,{});
  }
}
