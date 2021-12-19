import React from 'react'; 
import { render, screen, fireEvent, waitFor, RenderResult } from '@testing-library/react';
import { ContactForm } from './ContactForm';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe("Contact Form load", () => {
  it('renders correctly contact form when index route', () => {
    const handleSubmit = jest.fn();
    render(<MemoryRouter initialEntries={[{ pathname: '/' }]}>
      <ContactForm onSubmit={handleSubmit} />
    </MemoryRouter>);
  
    const linkElement = screen.getByText(/contate-nos/i);
    expect(linkElement).toBeInTheDocument();
  })
})

describe("Contact Form events", () => {
  let fieldName: HTMLInputElement;
  let fieldPhone: HTMLInputElement;
  let fieldEmail: HTMLInputElement;
  let fieldContactType: HTMLSelectElement;
  let fieldContactTypeOption: HTMLOptionElement[];
  let btnSubmit: HTMLButtonElement;

  let handleSubmit: () => void;

  beforeEach(async () => {
    handleSubmit = jest.fn();
  
    const { getByTestId, getAllByTestId, getByText }: RenderResult = render(<MemoryRouter initialEntries={[{ pathname: '/' }]}>
      <ContactForm onSubmit={handleSubmit} />
    </MemoryRouter>);
  
    fieldName = getByTestId('fieldName') as HTMLInputElement;
    fieldPhone = getByTestId('fieldPhone') as HTMLInputElement;
    fieldEmail = getByTestId('fieldEmail') as HTMLInputElement;
    fieldContactType = getByTestId('fieldContactType') as HTMLSelectElement;
    fieldContactTypeOption = getAllByTestId('fieldContactType-option') as HTMLOptionElement[];
  
    btnSubmit = getByTestId('btnSubmit') as HTMLButtonElement;
  
    await act(async () => {
      fireEvent.change(fieldName, { target: { value: 'John' } });
      fireEvent.change(fieldPhone, { target: { value: '(48) 34567-8901' } });
      fireEvent.change(fieldEmail, { target: { value: 'john.dee@someemail.com' } });
      
      //fireEvent.change(fieldContactType, { target: { value: 0 } });
    });
  })
  
  it("should filled form", async () => {
    expect(fieldName.value).toBe('John');
    expect(fieldPhone.value).toBe('(48) 34567-8901');
    expect(fieldEmail.value).toBe('john.dee@someemail.com');
    expect(fieldContactTypeOption[0].selected).toBeTruthy();
    expect(fieldContactTypeOption[1].selected).toBeFalsy();
    expect(fieldContactTypeOption[2].selected).toBeFalsy();
    expect(fieldContactType.selectedIndex).toBe(0);
  });

  it("should be able to submit form", async () => {    
    fireEvent.click(btnSubmit);
    
    //await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1))
  
    // await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({
    //   name: 'John',
    //   phone: '(12) 34567-8901',
    //   email: 'john.dee@someemail.com',
    //   contactType: 'Familiar'
    // }))
  })
})
