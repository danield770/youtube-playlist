import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const StyledItem = styled.li`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1px solid #111;
  margin-bottom: 0.5rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 2.5rem;
`;

const StyledTitle = styled.span`
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function PlayListItem({ id, title, duration, deleteVideo, index }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <StyledItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <StyledTitle title={title}>{title}</StyledTitle>
          <span>{duration}</span>
          <StyledButton
            type='button'
            onClick={() => {
              deleteVideo(id);
            }}
          >
            Delete
          </StyledButton>
        </StyledItem>
      )}
    </Draggable>
  );
}

export default PlayListItem;
