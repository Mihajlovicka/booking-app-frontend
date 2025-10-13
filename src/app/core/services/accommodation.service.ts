import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Path } from '../constant/path.enum';
import { Accommodation, CreateAccommodation, Equipment } from '../model/accommodation';
import { PriceType } from '../model/availability-period';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  public constructor(private http: HttpClient) { }

  public getEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(Path.Equipment);
  }

  public saveAccommodation(data: CreateAccommodation): Observable<void> {
    return this.http.post<void>(Path.Accommodations, data);
  }

  public getAllByUser(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(Path.Accommodations);
  }

  public getById(id: string): Observable<Accommodation> {
    return this.http.get<Accommodation>(`${Path.Accommodations}/${id}`);
  }

  public updatePriceType(accommodationId: string, priceType: PriceType): Observable<void> {
    return this.http.patch<void>(`${Path.Accommodations}/${accommodationId}/price-type`, { priceType });
  }
}
