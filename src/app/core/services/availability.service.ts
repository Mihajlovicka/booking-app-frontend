import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Path } from '../constant/path.enum';
import { Accommodation, CreateAccommodation, Equipment } from '../model/accommodation';
import { AvailabilityPeriod } from '../model/availability-period';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  constructor(private http: HttpClient) {}

  getPeriods(accommodationId: string): Observable<AvailabilityPeriod[]> {
    return this.http.get<AvailabilityPeriod[]>(`${Path.Booking}accommodations/${accommodationId}/availability`);
  }

  addPeriod(accommodationId: string, dto: AvailabilityPeriod): Observable<AvailabilityPeriod> {
    return this.http.post<AvailabilityPeriod>(`${Path.Booking}accommodations/${accommodationId}/availability`, dto);
  }

  deletePeriod(accommodationId: string, periodId: number): Observable<void> {
    return this.http.delete<void>(`${Path.Booking}accommodations/${accommodationId}/availability/${periodId}`);
  }
}
