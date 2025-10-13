import { PriceType } from "./availability-period";

export interface Equipment {
  name: string;
  selected: boolean;
}

export interface CreateAccommodation {
  name: string;
  description: string;
  equipment: Equipment[];
  address: Address;
  minNumberOfGuests?: number;
  maxNumberOfGuests?: number;
  pictureUrls: string[];
}

export interface Address {
  id?: number;
  streetName: string;
  streetNumber: string;
  city: string;
  country: string;
  postNumber: string;
}
export interface Accommodation {
  id: string;
  name: string;
  description: string;
  equipments: Equipment[];
  address: Address;
  minNumberOfGuests?: number;
  maxNumberOfGuests?: number;
  pictures: string[];
  priceType: PriceType;
}