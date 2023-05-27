import { Country } from "./Country";
import { League } from "./League";
import { Season } from "./Season";

export interface Team {
  id: number;
  name: string;
  description: string;
  league: League;
  country: Country;
  season: Season;
  logo: string;
}
