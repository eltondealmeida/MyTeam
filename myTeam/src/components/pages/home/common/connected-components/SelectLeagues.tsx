import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from "react";
import Select, { SingleValue } from "react-select";
import { useFormContext } from "react-hook-form";
import { User } from "../../../../../types/User";
import { CountryCode } from "../../../../../features/@core/CountryCode";
import { Season } from "../../../../../types/Season";
import { Leagues } from "../../../../../types/Leagues";

export interface SelectLeaguesOption {
  value: number;
  label: string;
}

export interface SelectLeaguesProps {
  countryCode: CountryCode;
  seasonYear: number;
  value?: SelectLeaguesOption;
  defaultValue?: SelectLeaguesOption;
  onChange?: (value: SingleValue<SelectLeaguesOption>) => void;
}

const SelectLeaguesRef: ForwardRefRenderFunction<any, SelectLeaguesProps> = (
  { countryCode, seasonYear, value, defaultValue, onChange, ...rest },
  ref
) => {
  const { watch } = useFormContext<User>();

  const [leagueOptions, setLeagueOptions] = useState<SelectLeaguesOption[]>([]);
  const [selectedValue, setSelectedValue] =
    useState<SelectLeaguesOption | null>(value || defaultValue || null);

  const apiKey = watch("apiKey") ?? localStorage.getItem("apiKey");

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch(
          "https://v3.football.api-sports.io/leagues",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": apiKey,
            },
          }
        );
        const data = await response.json();

        const leagues = data.response.filter((leagues: Leagues) => {
          return (
            leagues.country.code === countryCode &&
            leagues.seasons.some((season: Season) => season.year === seasonYear)
          );
        });

        const leagueOptions = leagues.map((leagues: Leagues) => ({
          value: leagues.league.id,
          label: leagues.league.name,
        }));

        setLeagueOptions(leagueOptions);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    fetchLeagues();
  }, [apiKey, countryCode, seasonYear, selectedValue]);

  const handleChange = (value: SingleValue<SelectLeaguesOption>) => {
    setSelectedValue(value);
    onChange && onChange(value);
  };

  return (
    <Select
      ref={ref}
      closeMenuOnSelect={false}
      placeholder="Selecione a liga"
      classNamePrefix="react-select"
      options={leagueOptions}
      value={selectedValue}
      onChange={handleChange}
      {...rest}
    />
  );
};

export const SelectLeagues = forwardRef(SelectLeaguesRef);
