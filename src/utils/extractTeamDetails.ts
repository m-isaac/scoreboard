import { MatchSummary } from './scoreBoard/types';

const extractTeamDetails = (summary: MatchSummary) => {
  const [homeSummary, awaySummary] = summary.split(' - ');
  const homeTeam = homeSummary.split(' ').slice(0, -1).join(' ');
  const awayTeam = awaySummary.split(' ').slice(0, -1).join(' ');
  const homeScore = Number(homeSummary.split(' ').slice(-1)[0]);
  const awayScore = Number(awaySummary.split(' ').slice(-1)[0]);
  return { homeTeam, homeScore, awayTeam, awayScore };
};

export default extractTeamDetails;
