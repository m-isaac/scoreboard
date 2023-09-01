import ScoreBoard from '../utils/scoreBoard';

type AppContext = {
  scoreboard: ScoreBoard;
  boardUpdated: boolean;
  error: string | undefined;
  setBoardUpdated: (value: boolean) => void;
  setError: (error: string | undefined) => void;
};

export default AppContext;
