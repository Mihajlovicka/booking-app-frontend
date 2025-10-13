export interface AvailabilityPeriod {
  id?: number;
  startDate: string;
  endDate: string;
  price: number;
}

export enum PriceType
{
    PerGuest = "PerGuest",
    PerUnit = "PerUnit"
}


export const priceTypes = [
  { label: "Per Guest", value: PriceType.PerGuest },
  { label: "Per Unit", value: PriceType.PerUnit }
];