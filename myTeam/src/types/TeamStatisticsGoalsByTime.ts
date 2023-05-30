export interface TeamStatisticsGoalsByTime {
  time: string;
  goals: {
    total: number;
    percentage: string;
  };
}
