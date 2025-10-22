export interface ReservationDto {
  id: number;
  startDate: string;
  endDate: string;
  accommodationExternalId: string;
  guestUsername: string;
  guestNumber: number;
  finalPrice: number;
}
