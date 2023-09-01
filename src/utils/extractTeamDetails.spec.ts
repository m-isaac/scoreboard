import { MatchSummary } from './scoreBoard/types';

const extractTeamDetails = (summary: MatchSummary) => ({});

describe('extractTeamDetails utility function', () => {
  it('extracts team names and team scores given match summary', () => {
    const homeTeam = 'Egypt';
    const awayTeam = 'USA';
    const homeScore = 4;
    const awayScore = 6;
    const summary: MatchSummary = `${homeTeam} ${homeScore} - ${awayTeam} ${awayScore}`;
    expect(extractTeamDetails(summary)).toEqual({
      homeTeam,
      homeScore,
      awayTeam,
      awayScore,
    });
  });
  it('works correctly when team names include spaces', () => {
    const homeTeam = 'South Africa';
    const awayTeam = 'The United States of America';
    const homeScore = 4;
    const awayScore = 6;
    // @ts-expect-error Seems like TS does not regard a string with spaces as string
    const summary: MatchSummary = `${homeTeam} ${homeScore} - ${awayTeam} ${awayScore}`;
    expect(extractTeamDetails(summary)).toEqual({
      homeTeam,
      homeScore,
      awayTeam,
      awayScore,
    });
  });
});
