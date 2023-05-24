import { CountryCode } from "./CountryCode";

export interface Teams {
  id: number;
  name: string;
  description: string;
  league: string;
  country: CountryCode;
}
