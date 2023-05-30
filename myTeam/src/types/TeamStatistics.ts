import { TeamStatisticsGoalsByTime } from "./TeamStatisticsGoalsByTime";
import { TeamStatisticsFixtures } from "./TeamStatisticsFixtures";

export interface TeamStatistics {
  formation: string;
  fixtures: TeamStatisticsFixtures;
  goalsByTime: TeamStatisticsGoalsByTime[];
}
