export interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
  accommodationExternalId: string;
  guestUsername: string;
  guestNumber: number;
  finalPrice: number;
  accommodationName?: string;
}
