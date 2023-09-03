/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import ScoreBoard from '../utils/scoreBoard';
import AppContext from './types';

const scoreboard = new ScoreBoard();
const appContext = createContext<AppContext | null>(null);

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [error, setError] = useState<string>();
  const [boardUpdated, setBoardUpdated] = useState<boolean>(false);
  const [boardSummary, setBoardSummary] = useState(scoreboard.getSummary);

  useEffect(() => {
    if (boardUpdated) {
      setBoardSummary(scoreboard.getSummary());
      setBoardUpdated(false);
    }
  }, [boardUpdated, setBoardUpdated]);

  const startNewMatch = useCallback((homeTeam: string, awayTeam: string) => {
    try {
      scoreboard.startNewMatch(homeTeam, awayTeam);
      setBoardUpdated(true);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      setTimeout(() => setError(undefined), 1600);
    }
  }, []);

  const finishMatch = useCallback((homeTeam: string, awayTeam: string) => {
    try {
      scoreboard.finishMatch(homeTeam, awayTeam);
      setBoardUpdated(true);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      setTimeout(() => setError(undefined), 1600);
    }
  }, []);

  const updateMatch = useCallback((teams: [string, string], scores: [number, number]) => {
    try {
      scoreboard.updateMatch(teams, scores);
      setBoardUpdated(true);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      setTimeout(() => setError(undefined), 1600);
    }
  }, []);

  const contextValue: AppContext = useMemo(
    () => ({
      boardSummary,
      error,
      startNewMatch,
      finishMatch,
      updateMatch,
    }),
    [boardSummary, error, finishMatch, startNewMatch, updateMatch],
  );
  return <appContext.Provider value={contextValue}>{children}</appContext.Provider>;
};

const useAppContext = () => useContext(appContext) as AppContext;
export { AppContextProvider, useAppContext };
