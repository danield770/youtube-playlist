import React from 'react';
import ReactPlayer from 'react-player';
import { query, deleteVideo } from '../database/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';

const StyledContainer = styled.div`
  border: 1px solid #111;
`;

const StyledEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Video() {
  const [videos] = useCollectionData(query);

  const endCallback = () => {
    console.log('end callback...');
    deleteVideo(videos[0].id);
  };

  return (
    <StyledContainer>
      {videos?.length > 0 ? (
        <ReactPlayer
          width='100%'
          height='100%'
          playing={true}
          controls={true}
          url={`https://www.youtube.com/embed/${videos[0].youtubeId}`}
          onEnded={endCallback}
        />
      ) : (
        <StyledEmpty>
          Add a video to the playlist to show the video here!
        </StyledEmpty>
      )}
    </StyledContainer>
  );
}

export default Video;
