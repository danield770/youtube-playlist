import React from 'react';
import PlayListItem from './PlayListItem';
import AddVideo from './AddVideo';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  query,
  addVideo,
  deleteVideo,
  getDocument,
  updateDocument,
} from '../database/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';

const StyledContainer = styled.div`
  border: 1px solid #111;
  padding: 1rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-rows: 2rem calc(90vh - 6rem);
`;

const StyledVideosList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function onDragEnd(result) {
  console.log('result', result);

  const { destination, source, draggableId } = result;

  if (!destination) return; //if dropped outside droppable area
  if (destination.index === source.index) return; // dropped at the same position that it started

  // TODO: Get the destination id in a better way
  let destinationId = document
    .querySelector('ul')
    .children[destination.index].getAttribute('data-rbd-draggable-id');

  // Swap source and destination timestamps to persist drag drop (videos are ordered by timestamp)
  // TODO: figure out how to fix the glitch on drag/drop
  let promise = Promise.all([
    getDocument(draggableId),
    getDocument(destinationId),
  ]);
  promise.then((docs) => {
    console.log('source doc', docs[0]);
    console.log('destination doc', docs[1]);
    updateDocument(destinationId, 'timestamp', docs[0].timestamp);
    updateDocument(draggableId, 'timestamp', docs[1].timestamp);
  });
}

function PlayList() {
  const [videos] = useCollectionData(query);

  return (
    <StyledContainer>
      <AddVideo addVideo={addVideo} />
      {videos?.length > 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='videos'>
            {(provided) => (
              <StyledVideosList
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {videos &&
                  videos.map((video, index) => (
                    <PlayListItem
                      key={video.id}
                      id={video.id}
                      title={video.title}
                      duration={video.duration}
                      deleteVideo={deleteVideo}
                      index={index}
                    />
                  ))}
                {provided.placeholder}
              </StyledVideosList>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <StyledEmpty>No videos currently in playlist</StyledEmpty>
      )}
    </StyledContainer>
  );
}

export default PlayList;
