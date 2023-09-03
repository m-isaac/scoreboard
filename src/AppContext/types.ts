import { MatchSummary } from '../utils/scoreBoard/types';

type AppContext = {
  boardSummary: MatchSummary[];
  error: string | undefined;
  startNewMatch: (homeTeam: string, awayTeam: string) => void;
  finishMatch: (homeTeam: string, awayTeam: string) => void;
  updateMatch: (teams: [string, string], sores: [number, number]) => void;
};

export default AppContext;
