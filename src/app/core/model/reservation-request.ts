export interface CreateReservationRequest {
  accommodationExternalId: string;
  startDate: string;
  endDate: string;
  guestNumber: number;
}

export interface ReservationRequest {
  accommodationExternalId: string;
  startDate: string;
  endDate: string;
  guestNumber: number;
  externalId: string;
  finalPrice: number;
  guestUsername: string;
}
