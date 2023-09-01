import { styled } from 'styled-components';
import { useAppContext } from '../AppContext';

const Wrapper = styled.div`
  color: red;
  z-index: 40;
  background-color: #00000047;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  font-size: 2.5rem;
  font-weight: 400;

  & span {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 8px;
    line-height: 0px;
  }
`;

const ErrorOverlay: React.FC = () => {
  const { error } = useAppContext();
  return (
    <>
      {error && (
        <Wrapper>
          <span>{error}</span>
        </Wrapper>
      )}
    </>
  );
};

export default ErrorOverlay;
