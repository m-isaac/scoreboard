import styled from 'styled-components';

export const Button = styled.button<{ $bgColor: string }>`
  padding: 0.3rem;
  border-radius: 0.375rem;
  border: 1px solid #374151;
  font-size: 1.2rem;
  line-height: 1.5rem;
  font-weight: 500;
  background-color: ${({ $bgColor }) => $bgColor};

  &:disabled {
    cursor: not-allowed;
    background: #cbd5e1;
  }
`;

export const Input = styled.input`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border-width: 1px;
  width: 30%;
  font-size: 1.2rem;
  line-height: 1.5rem;
`;
