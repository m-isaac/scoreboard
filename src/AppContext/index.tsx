/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, PropsWithChildren, useContext } from 'react';
import ScoreBoard from '../utils/scoreBoard';
import AppContext from './types';

const scoreboard = new ScoreBoard();
const appContext = createContext<AppContext | null>(null);

const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [error, setError] = useState<string>();
  const [boardUpdated, setBoardUpdated] = useState<boolean>(false);

  const contextValue: AppContext = {
    scoreboard,
    boardUpdated,
    error,
    setBoardUpdated,
    setError,
  };
  return <appContext.Provider value={contextValue}>{children}</appContext.Provider>;
};

const useAppContext = () => useContext(appContext) as AppContext;
export { AppContextProvider, useAppContext };
