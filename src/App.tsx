import styled from 'styled-components';
import TeamList from './components/MatchList';
import TopBar from './components/TopBar';
import { AppContextProvider } from './AppContext';
import ErrorOverlay from './components/ErrorOverlay';
import './App.css';

const AppWrapper = styled.div`
  display: flex;
  position: relative;
  padding: 1rem;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  height: 100vh;
  font-size: 1rem;
  line-height: 1.5rem;
  background: #7dd3fc;
`;

function App() {
  return (
    <AppContextProvider>
      <AppWrapper>
        <ErrorOverlay />
        <TopBar />
        <TeamList />
      </AppWrapper>
    </AppContextProvider>
  );
}

export default App;
