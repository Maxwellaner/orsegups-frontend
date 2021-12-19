import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import App from '../../App';
import { 
  createHistory,
  createMemorySource,
  LocationProvider
} from '@reach/router';
import { act } from 'react-dom/test-utils';

function renderWithRouter(
  ui: any,
  {route = '/', history = createHistory(createMemorySource(route))} = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  }
}

describe("should be possible to navigate through sidebar links", () => {
  it("must be able to navigate to contact listing page", async () => {
    const { getByText, container } = renderWithRouter(<App />);
      const appContainer = container;
      
      const linkToContactsPage = getByText(/ver contatos/i);
  
      await act(async () => {
        fireEvent.click(linkToContactsPage);
      });
  
      expect(appContainer.innerHTML).toMatch(/lista de contatos/i);
  });
  
  it("it should be possible to go back to the form.", async () => {
    const { getByText, container } = renderWithRouter(<App />, { route: '/contacts' });
      const appContainer = container;

      expect(appContainer.innerHTML).toMatch(/lista de contatos/i);

      const linkToFormPage = getByText(/cadastrar contato/i);

      await act(async () => {
        fireEvent.click(linkToFormPage);
      });
  
      expect(appContainer.innerHTML).toMatch(/contate-nos/i);
  });
});
