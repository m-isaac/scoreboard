import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from './common';
import { useAppContext } from '../AppContext';

const Wrapper = styled.div`
  display: flex;
  padding: 0.4rem;
  gap: 2rem;
  justify-content: space-between;
  border-radius: 0.375rem;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  background-color: #0000005e;
`;

const TopBar: React.FC = () => {
  const { scoreboard, setBoardUpdated, setError } = useAppContext();
  const [homeTeamName, setHomeTeamName] = useState('');
  const [awayTeamName, setAwayTeamName] = useState('');

  const handleTeamNameChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'home') setHomeTeamName(value);
    if (name === 'away') setAwayTeamName(value);
  }, []);

  const handleStartMatch = () => {
    try {
      scoreboard.startNewMatch(homeTeamName, awayTeamName);
      setBoardUpdated(true);
      setHomeTeamName('');
      setAwayTeamName('');
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      setTimeout(() => setError(undefined), 1600);
    }
  };

  return (
    <Wrapper>
      <Input
        type="text"
        name="home"
        value={homeTeamName}
        onChange={handleTeamNameChange}
        placeholder="Home team"
      />
      <Input
        type="text"
        name="away"
        value={awayTeamName}
        onChange={handleTeamNameChange}
        placeholder="Away team"
      />
      <Button
        $bgColor="#6ee7b7"
        disabled={!(homeTeamName && awayTeamName)}
        onClick={handleStartMatch}
      >
        Start Match
      </Button>
    </Wrapper>
  );
};

export default TopBar;
