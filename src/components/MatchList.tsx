import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from './common';
import { useAppContext } from '../AppContext';
import extractTeamDetails from '../utils/extractTeamDetails';

const Container = styled.div`
  display: flex;
  overflow-y: auto;
  position: relative;
  padding: 0.8rem;
  padding-top: 0;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  background-color: #ffffff;
`;

const Row = styled.div`
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.6rem;
  box-shadow: inset #5f6690 0px 0px 5px 2px;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.016);
  }
`;

const Title = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 1.5rem 0;
  border-bottom: 2px solid #262626;
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  background-color: #ffffff;
`;

const TeamList: React.FC = () => {
  const { updateMatch, finishMatch, boardSummary } = useAppContext();
  const [selectedMatch, setSelectedMatch] = useState<number>();
  const [updatedScore, setUpdatedScore] = useState<[number, number]>();

  const handleScoreChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target;
      const [homeScore, awayScore] = updatedScore!;
      if (name === 'home') setUpdatedScore([Number(value), awayScore]);
      if (name === 'away') setUpdatedScore([homeScore, Number(value)]);
    },
    [updatedScore],
  );

  const handleSave = (teams: [string, string]) => {
    updateMatch(teams, updatedScore!);
    setSelectedMatch(undefined);
  };

  const handleCancel = useCallback(() => setSelectedMatch(undefined), []);

  return (
    <Container>
      <Title>Ongoing Matches</Title>
      {boardSummary.length === 0 && (
        <div className="p-3 text-xl">No matches currently in progress</div>
      )}
      {boardSummary.map((summary, i) => {
        const { homeTeam, homeScore, awayTeam, awayScore } = extractTeamDetails(summary);
        const MatchUpdate = (
          <Row className="bg-slate-500">
            <div className="flex gap-2">
              <Input
                type="number"
                name="home"
                value={updatedScore?.at(0)}
                placeholder={homeTeam}
                onChange={handleScoreChange}
              />
              <Input
                type="number"
                name="away"
                value={updatedScore?.at(1)}
                placeholder={awayTeam}
                onChange={handleScoreChange}
              />
            </div>
            <div className="flex gap-2">
              <Button $bgColor="#6ee7b7" onClick={() => handleSave([homeTeam, awayTeam])}>
                Save
              </Button>
              <Button $bgColor="#fca5a5" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Row>
        );
        const MatchSummary = (
          <Row key={i}>
            <span className="match-summary">{summary}</span>
            <div className="flex gap-2">
              <Button
                $bgColor="#93c5fd"
                onClick={() => {
                  setSelectedMatch(i);
                  setUpdatedScore([homeScore, awayScore]);
                }}
              >
                Update Scores
              </Button>
              <Button
                $bgColor="#fca5a5"
                onClick={() => {
                  finishMatch(homeTeam, awayTeam);
                }}
              >
                Finish Match
              </Button>
            </div>
          </Row>
        );
        return i === selectedMatch ? MatchUpdate : MatchSummary;
      })}
    </Container>
  );
};

export default TeamList;
