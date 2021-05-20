import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import useFetch from './useFetch';

function fetchMock(url) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        json: () =>
          Promise.resolve({
            data: url,
          }),
      });
    }, 200 + Math.random() * 300)
  );
}

beforeAll(() => {
  jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
});

afterAll(() => {
  global.fetch.mockClear();
});

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

it('useFetch hook runs correctly', () => {
  act(() => {
    render(<TestComponent url='url1' />, container);
  });
  expect(container.textContent).toBe('loading');
});

function TestComponent({ url }) {
  const { data, isLoading } = useFetch(url);
  if (isLoading) {
    return <div>loading</div>;
  }
  return <div>{data}</div>;
}
