import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Review } from "../model/review";
import { Observable } from "rxjs";
import { Path } from "../constant/path.enum";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  public constructor(private http: HttpClient) { }

  addReview(data: Review[]): Observable<void> {
    return this.http.post<void>(`${Path.Booking}reviews`, data);
  }
}
