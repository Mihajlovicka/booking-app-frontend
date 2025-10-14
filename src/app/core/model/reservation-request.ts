export interface CreateReservationRequest {
  accommodationExternalId: string;
  startDate: string;
  endDate: string;
  guestNumber: number;
}
