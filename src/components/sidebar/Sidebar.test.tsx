import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom';
import App from '../../App';
import { 
  Router,
  Link,
  createHistory,
  createMemorySource,
  LocationProvider
} from '@reach/router';

function renderWithRouter(
  ui: any,
  {route = '/', history = createHistory(createMemorySource(route))} = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  }
}

it("should be able to navigate to contact list", async () => {
  const { container, history: {navigate} } = renderWithRouter(<App />);
  const appContainer = container;

  expect(appContainer.innerHTML).toMatch(/contate-nos/i);

  await navigate('/contacts');
  expect(appContainer.innerHTML).toMatch(/lista de contatos/i);
});

it("should be able to navigate to contact form", async () => {
  const { container, history: {navigate} } = renderWithRouter(<App />);
  const appContainer = container;

  expect(appContainer.innerHTML).toMatch(/contate-nos/i);

  await navigate('/');
  expect(appContainer.innerHTML).toMatch(/lista de contatos/i);
});
