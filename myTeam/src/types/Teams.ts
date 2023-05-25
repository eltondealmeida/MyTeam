import { CountryCode } from "../features/@core/CountryCode";

export interface Teams {
  id: number;
  name: string;
  description: string;
  league: string;
  country: CountryCode;
  season: number;
}
