import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  align-content: space-evenly;
  place-content: center;
  height: 100vh;

  h1 {
    place-content: center;
  }

  .MuiTextField-root {
    width: 50vw;
  }

  .MuiButton-root {
    margin-left: 0.875rem;
    margin-top: 0.875rem;
  }
`;
