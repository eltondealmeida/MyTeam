import { Country } from "./Country";
import { League } from "./League";
import { Season } from "./Season";

export interface Leagues {
  league: League;
  country: Country;
  seasons: Season[];
}
