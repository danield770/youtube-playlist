import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import PlayListItem from './PlayListItem';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders props data', () => {
  act(() => {
    render(
      <DragDropContext>
        <Droppable>
          {(provided) => (
            <PlayListItem
              title='My Great video'
              duration='3:32'
              id='qvrebreb'
              index='4'
            >
              <Draggable />
            </PlayListItem>
          )}
        </Droppable>
      </DragDropContext>,
      container
    );
  });
  expect(container.textContent).toContain('My Great video');
  expect(container.textContent).toContain('3:32');
});
