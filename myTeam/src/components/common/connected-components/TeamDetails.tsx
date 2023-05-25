import { useEffect, useState } from "react";
import { TeamStatistics } from "../../../types/TeamStatistics";
import { Player } from "../../../types/Player";
import { User } from "../../../types/User";
import { useFormContext } from "react-hook-form";
import { Chart } from "react-chartjs-2";

interface TeamDetailsProps {
  teamId: number;
  seasonYear: number;
  leagueId: number;
}

export function TeamDetails({
  teamId,
  seasonYear,
  leagueId,
}: TeamDetailsProps) {
  const { watch } = useFormContext<User>();

  const [players, setPlayers] = useState<Player[] | undefined>([]);
  const [formation, setFormation] = useState<string | undefined>("");
  const [results, setResults] = useState<TeamStatistics["results"] | undefined>(
    {
      totalGames: 0,
      totalWins: 0,
      totalLosses: 0,
      totalDraws: 0,
    }
  );
  const [goalsByTime, setGoalsByTime] = useState<
    TeamStatistics["goalsByTime"] | undefined
  >([]);

  const apiKey = watch("apiKey") ?? localStorage.getItem("apiKey");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/players?team=${teamId}&season=${seasonYear}&league=${leagueId}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": apiKey,
            },
          }
        );
        const data = await response.json();
        setPlayers(data.response);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    const fetchTeamStatistics = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/teams/statistics?season=${seasonYear}&team=${teamId}&league=${leagueId}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "v3.football.api-sports.io",
              "x-rapidapi-key": apiKey,
            },
          }
        );
        const data = await response.json();
        setFormation(data.response.formation);
        setResults(data.response.results);
        setGoalsByTime(data.response.goalsByTime);
      } catch (error) {
        console.error("Error fetching team statistics:", error);
      }
    };

    fetchPlayers();
    fetchTeamStatistics();
  }, [apiKey, teamId, seasonYear, leagueId]);

  return (
    <div>
      <h2>Detalhes do Time</h2>
      <h3>Jogadores:</h3>
      <ul>
        {players &&
          players.map((player) => (
            <li key={player.id}>
              Nome: {player.name}, Idade: {player.age}, Nacionalidade:
              {player.nationality}
            </li>
          ))}
      </ul>

      <h3>Estatísticas:</h3>
      {results && (
        <div>
          <p>Formação: {formation}</p>
          <p>Total de jogos: {results.totalGames}</p>
          <p>Total de vitórias: {results.totalWins}</p>
          <p>Total de derrotas: {results.totalLosses}</p>
          <p>Total de empates: {results.totalDraws}</p>
        </div>
      )}

      <h3>Gols por tempo de jogo:</h3>
      {goalsByTime && goalsByTime.length > 0 && (
        <Chart
          type="bar"
          data={{
            labels: goalsByTime.map((item) => `${item.time}'`),
            datasets: [
              {
                label: "Gols Marcados por Tempo de Jogo",
                data: goalsByTime.map((item) => item.goals),
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
              },
            ],
          }}
        />
      )}
    </div>
  );
}
