import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Review, ViewHostAccommodationReviewDto } from "../model/review";
import { Observable } from "rxjs";
import { Path } from "../constant/path.enum";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  public constructor(private http: HttpClient) { }

  public addReview(data: Review[]): Observable<void> {
    return this.http.post<void>(`${Path.Booking}reviews`, data);
  }

  public getAvgGradeForAccommodation(accommodationExternalId :string): Observable<number> {
    return this.http.get<number>(`${Path.Booking}reviews/${accommodationExternalId}`);
  }

  public allGradesForAccommodationView(accommodationExternalId :string): Observable<ViewHostAccommodationReviewDto[]> {
    return this.http.get<ViewHostAccommodationReviewDto[]>(`${Path.Booking}reviews/${accommodationExternalId}/all`);
  }

  public delete(accommodationExternalId :string): Observable<void> {
    return this.http.delete<void>(`${Path.Booking}reviews/${accommodationExternalId}`);
  }

  public getaccrater(accommodationExternalId :string): Observable<ViewHostAccommodationReviewDto> {
    return this.http.get<ViewHostAccommodationReviewDto>(`${Path.Booking}reviews/${accommodationExternalId}/rater`);
  }
}
