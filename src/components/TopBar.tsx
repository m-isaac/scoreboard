import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from './common';
import { useAppContext } from '../AppContext';

const Wrapper = styled.form`
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

const TopBar: React.FC = React.memo(() => {
  const { startNewMatch } = useAppContext();
  const [homeTeamName, setHomeTeamName] = useState('');
  const [awayTeamName, setAwayTeamName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTeamNameChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'home') setHomeTeamName(value);
    if (name === 'away') setAwayTeamName(value);
  }, []);

  const handleStartMatch: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    startNewMatch(homeTeamName, awayTeamName);
    setHomeTeamName('');
    setAwayTeamName('');
    inputRef?.current?.focus();
  };

  return (
    <Wrapper>
      <Input
        type="text"
        name="home"
        value={homeTeamName}
        onChange={handleTeamNameChange}
        placeholder="Home team"
        autoFocus
        ref={inputRef}
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
});

export default TopBar;
