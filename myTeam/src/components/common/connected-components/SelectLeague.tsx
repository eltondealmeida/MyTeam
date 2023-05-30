import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from "react";
import Select, { SingleValue } from "react-select";
import { useFormContext } from "react-hook-form";
import { CountryCode } from "../../../features/@core/CountryCode";
import { Season } from "../../../types/Season";
import { Leagues } from "../../../types/Leagues";

export interface SelectLeagueOption {
  value: number;
  label: string;
}

export interface SelectLeagueProps {
  countryCode: CountryCode;
  seasonYear: number;
  value?: SelectLeagueOption;
  defaultValue?: SelectLeagueOption;
  onChange?: (value: SingleValue<SelectLeagueOption>) => void;
}

const SelectLeagueRef: ForwardRefRenderFunction<any, SelectLeagueProps> = (
  { countryCode, seasonYear, value, defaultValue, onChange, ...rest },
  ref
) => {
  const { watch, setValue } = useFormContext();

  const [leagueOptions, setLeagueOptions] = useState<SelectLeagueOption[]>([]);
  const [selectedValue, setSelectedValue] = useState<SelectLeagueOption | null>(
    value || defaultValue || null
  );

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

        const leagueNameAndLogo = data.response.find(
          (league: Leagues) => league.league.id === selectedValue?.value
        );

        if (leagueNameAndLogo) {
          setValue("league.name", leagueNameAndLogo.league.name);
          localStorage.setItem("leagueName", leagueNameAndLogo.league.name);
          setValue("league.logo", leagueNameAndLogo.league.logo);
          localStorage.setItem("leagueLogo", leagueNameAndLogo.league.logo);
        }

        if (
          selectedValue &&
          !leagueOptions.find(
            (option: { value: number }) => option.value === selectedValue.value
          )
        ) {
          setSelectedValue(null);
        }
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    fetchLeagues();
  }, [apiKey, countryCode, seasonYear, selectedValue, setValue]);

  const handleChange = (value: SingleValue<SelectLeagueOption>) => {
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

export const SelectLeague = forwardRef(SelectLeagueRef);
