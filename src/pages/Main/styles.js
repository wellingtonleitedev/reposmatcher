import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;

  p {
    margin-top: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  margin-top: 20px;
  max-width: 400px;
  width: 100%;

  input {
    flex: 1;
    background: #fff;
    border: ${props => (props.withError ? '2px solid #F00' : 0)};
    border-radius: 3px;
    color: #444;
    height: 55px;
    padding: 0 20px;
    font-size: 18px;
  }

  button {
    background: #63f5b0;
    border: 0;
    border-radius: 3px;
    color: #fff;
    height: 55px;
    margin-left: 10px;
    padding: 0 20px;
    font-size: 20px;

    &:hover {
      background: #52d89f;
    }
  }
`;
