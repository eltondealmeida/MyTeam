export interface TeamStatistics {
  formation: string;
  results: {
    totalGames: number;
    totalWins: number;
    totalLosses: number;
    totalDraws: number;
  };
  goalsByTime: {
    time: number;
    goals: number;
  }[];
}
