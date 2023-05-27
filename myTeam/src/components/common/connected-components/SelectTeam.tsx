import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from "react";
import Select, { SingleValue } from "react-select";
import { useFormContext } from "react-hook-form";
import { User } from "../../../types/User";
import { Team } from "../../../types/Team";

export interface SelectTeamOption {
  value: number;
  label: string;
}

export interface SelectTeamProps {
  leagueId: number;
  seasonYear: number;
  value?: SelectTeamOption;
  defaultValue?: SelectTeamOption;
  onChange?: (value: SingleValue<SelectTeamOption>) => void;
}

const SelectTeamRef: ForwardRefRenderFunction<any, SelectTeamProps> = (
  { leagueId, seasonYear, value, defaultValue, onChange, ...rest },
  ref
) => {
  const { watch } = useFormContext<User>();
  const { setValue } = useFormContext<Team>();

  const [teamOptions, setTeamOptions] = useState<SelectTeamOption[]>([]);
  const [selectedValue, setSelectedValue] = useState<SelectTeamOption | null>(
    value || defaultValue || null
  );

  const apiKey = watch("apiKey") ?? localStorage.getItem("apiKey");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/teams?league=${leagueId}&season=${seasonYear}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": apiKey,
            },
          }
        );
        const data = await response.json();

        const teamOptions = data.response.map((team: any) => ({
          value: team.team.id,
          label: team.team.name,
        }));

        setTeamOptions(teamOptions);

        const teamNameAndLogo = data.response.find(
          (team: any) => team.team.id === selectedValue?.value
        );

        if (teamNameAndLogo) {
          setValue("name", teamNameAndLogo.team.name);
          localStorage.setItem("teamName", teamNameAndLogo.team.name);
          setValue("logo", teamNameAndLogo.team.logo);
          localStorage.setItem("teamLogo", teamNameAndLogo.team.logo);
        }

        if (
          selectedValue &&
          !teamOptions.find(
            (option: { value: number }) => option.value === selectedValue.value
          )
        ) {
          setSelectedValue(null);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    if (leagueId && apiKey) {
      fetchTeams();
    }
  }, [leagueId, apiKey, selectedValue, seasonYear]);

  const handleChange = (value: SingleValue<SelectTeamOption>) => {
    setSelectedValue(value);
    onChange && onChange(value);
  };

  return (
    <Select
      ref={ref}
      closeMenuOnSelect={false}
      placeholder="Selecione o time"
      classNamePrefix="react-select"
      options={teamOptions}
      value={selectedValue}
      onChange={handleChange}
      {...rest}
    />
  );
};

export const SelectTeam = forwardRef(SelectTeamRef);
