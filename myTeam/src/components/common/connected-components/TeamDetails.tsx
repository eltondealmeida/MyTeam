import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import Flex from "../Flex";

import { User } from "../../../types/User";
import { Players } from "../../../types/Players";
import { Col, Table } from "react-bootstrap";
import { TeamStatisticsFixtures } from "../../../types/TeamStatisticsFixtures";
import { TeamStatisticsGoalsByTime } from "../../../types/TeamStatisticsGoalsByTime";
import { TeamStatisticsGoalData } from "../../../types/TeamStatisticsGoalData";

interface TeamDetailsProps {
  teamId: number;
  seasonYear: number;
  leagueId: number;
  teamName: string;
  teamLogo: string;
  leagueName: string;
  leagueLogo: string;
}

export function TeamDetails({
  teamId,
  seasonYear,
  leagueId,
  teamName,
  teamLogo,
  leagueName,
  leagueLogo,
}: TeamDetailsProps) {
  const { watch } = useFormContext<User>();

  const [players, setPlayers] = useState<Players[]>([]);
  const [bestFormation, setBestFormation] = useState<string>("");
  const [fixtures, setFixtures] = useState<TeamStatisticsFixtures>({
    played: { total: 0 },
    wins: { total: 0 },
    draws: { total: 0 },
    loses: { total: 0 },
  });
  const [goalsByTime, setGoalsByTime] = useState<TeamStatisticsGoalsByTime[]>([
    {
      time: "",
      goals: {
        total: 0,
        percentage: "",
      },
    },
  ]);

  const apiKey = watch("apiKey") ?? localStorage.getItem("apiKey");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/players?team=${teamId}&season=${seasonYear}`,
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

        const mostPlayedFormation = data.response.lineups.reduce(
          (prev: { played: number }, current: { played: number }) => {
            const prevPlayed = Number(prev.played);
            const currentPlayed = Number(current.played);
            return prevPlayed > currentPlayed ? prev : current;
          }
        );
        setBestFormation(mostPlayedFormation.formation);

        setFixtures({
          played: { total: data.response.fixtures.played.total },
          wins: { total: data.response.fixtures.wins.total },
          draws: { total: data.response.fixtures.draws.total },
          loses: { total: data.response.fixtures.loses.total },
        });

        const goalsByTimeData: TeamStatisticsGoalData =
          data.response.goals.for.minute;
        const transformedData: TeamStatisticsGoalsByTime[] = Object.keys(
          goalsByTimeData
        ).map((time) => ({
          time,
          goals: goalsByTimeData[time],
        }));
        setGoalsByTime(transformedData);
      } catch (error) {
        console.error("Error fetching team statistics:", error);
      }
    };

    if (apiKey && teamId && seasonYear && leagueId) {
      fetchPlayers();
      fetchTeamStatistics();
    }
  }, [teamId, seasonYear, leagueId, apiKey]);

  useEffect(() => {
    if (goalsByTime && goalsByTime.length > 0) {
      const data = {
        labels: goalsByTime.map((goal) => goal.time),
        datasets: [
          {
            label: "Porcentagem de gols",
            data: goalsByTime.map((goal) => goal.goals.total),
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const goalsByTimeChart = document.getElementById(
        "goalsByTimeChart"
      ) as HTMLCanvasElement;
      if (goalsByTimeChart) {
        const ctx = goalsByTimeChart.getContext("2d");
        if (ctx) {
          new Chart(ctx, {
            type: "doughnut",
            data: data,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            },
          });
        }
      }
    }
  }, [goalsByTime]);

  return (
    <div className="border rounded border-2 text-light">
      <h2 className="mt-2 mb-3">Detalhes do time</h2>

      <Flex justifyContent="center">
        <div className=" mb-1 me-4">
          <img src={leagueLogo} alt={leagueName} width="50" height="50" />
          <p>{leagueName}</p>
        </div>
        <div className="mb-1">
          <img src={teamLogo} alt={teamName} width="50" height="50" />
          <p>{teamName}</p>
        </div>
      </Flex>
      <div className="mb-1">
        <p>Melhor formação: {bestFormation}</p>
      </div>

      <Flex justifyContent="center" className="mb-3">
        <Col md={6} className="border rounded border-2 d-flex flex-column">
          <h3 className="m-3">Jogadores</h3>
          {players &&
            players.map((player) => (
              <Flex
                justifyContent="start"
                key={player.player.id}
                className="ms-5"
              >
                <div className="me-2">
                  <img
                    src={player.player.photo}
                    alt={player.player.name}
                    width="30"
                    height="30"
                  />
                </div>
                <div>
                  <p key={player.player.id} className="text-start">
                    Nome: {player.player.name}, Idade: {player.player.age},
                    Nacionalidade: {player.player.nationality}
                  </p>
                </div>
              </Flex>
            ))}
        </Col>
      </Flex>

      <Flex justifyContent="center" className="mb-3">
        <Col md={6} className="border rounded border-2 d-flex flex-column">
          <h3 className="m-3">Estatísticas do time</h3>
          {fixtures ? (
            <Table
              className="text-light"
              style={{ backgroundColor: "#0e1129" }}
            >
              <thead>
                <tr>
                  <th>Total de jogos</th>
                  <th>Vitórias</th>
                  <th>Derrotas</th>
                  <th>Empates</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{fixtures.played.total}</td>
                  <td>{fixtures.wins.total}</td>
                  <td>{fixtures.loses.total}</td>
                  <td>{fixtures.draws.total}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p>Não há estatísticas do time disponíveis.</p>
          )}
        </Col>
      </Flex>

      <Flex justifyContent="center" className="mb-3">
        <Col md={6} className="border rounded border-2 d-flex flex-column">
          <h3 className="m-3">Gols marcados por tempo de jogo</h3>
          {goalsByTime && goalsByTime.length > 0 ? (
            <Doughnut
              className="m-3"
              data={{
                labels: goalsByTime.map((goal) => goal.time),
                datasets: [
                  {
                    label: "Porcentagem de gols",
                    data: goalsByTime.map((goal) => goal.goals.total),
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.5)",
                      "rgba(54, 162, 235, 0.5)",
                      "rgba(255, 206, 86, 0.5)",
                      "rgba(75, 192, 192, 0.5)",
                      "rgba(153, 102, 255, 0.5)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          ) : (
            <p>Não há dados de gols por tempo disponíveis.</p>
          )}
        </Col>
      </Flex>
    </div>
  );
}
