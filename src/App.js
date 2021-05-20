import React from 'react';
import PlayList from './Components/PlayList';
import Video from './Components/Video';
import styled from 'styled-components';

const StyledMain = styled.main`
  width: 90vw;
  height: 90vh;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 2fr;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

function App() {
  return (
    <StyledMain>
      <PlayList />
      <Video />
    </StyledMain>
  );
}

export default App;
