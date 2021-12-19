import React from 'react'; 
import { render, screen, fireEvent, waitFor, RenderResult } from '@testing-library/react';
import { ContactForm } from './ContactForm';
import { MemoryRouter } from 'react-router-dom';
import { 
  createHistory,
  createMemorySource,
  LocationProvider
} from '@reach/router';
import { act } from 'react-dom/test-utils';
import { IContactValidation } from './interface';

function renderWithRouter(
  ui: any,
  {route = '/', history = createHistory(createMemorySource(route))} = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  }
}

describe("Contact Form load", () => {
  it('renders correctly contact form when index route', () => {
    const handleSubmit = jest.fn();
    render(<MemoryRouter initialEntries={[{ pathname: '/' }]}>
      <ContactForm onSubmit={handleSubmit} />
    </MemoryRouter>);
  
    const formText = screen.getByText(/contate-nos/i);
    expect(formText).toBeInTheDocument();
  })
})

async function events(input: IContactValidation) {
  const handleSubmit = jest.fn();
  
  const { getByTestId, getAllByTestId, container }: RenderResult = renderWithRouter(<MemoryRouter initialEntries={[{ pathname: '/' }]}>
    <ContactForm onSubmit={handleSubmit} />
  </MemoryRouter>);

  const fieldName = getByTestId('fieldName') as HTMLInputElement;
  const fieldPhone = getByTestId('fieldPhone') as HTMLInputElement;
  const fieldEmail = getByTestId('fieldEmail') as HTMLInputElement;
  const fieldContactType = getByTestId('fieldContactType') as HTMLSelectElement;
  const fieldContactTypeOption = getAllByTestId('fieldContactType-option') as HTMLOptionElement[];

  const btnSubmit = getByTestId('btnSubmit') as HTMLButtonElement;

  await act(async () => {
    fireEvent.change(fieldName, { target: { value: input.name } });
    fireEvent.change(fieldPhone, { target: { value: input.phone } });
    fireEvent.change(fieldEmail, { target: { value: input.email } });
    fireEvent.change(fieldContactType, { target: { value: input.contactType } });
  });

  return {
    container,
    handleSubmit,
    btnSubmit,
    fieldName,
    fieldEmail,
    fieldPhone,
    fieldContactType,
    fieldContactTypeOption
  }
}

describe("Contact Form events", () => {
  const fill: IContactValidation = {
    name: 'John',
    contactType: 'familiar',
    email: 'john.dee@someemail.com',
    phone: '(48) 34567-8901'
  };
  
  it("the form must be completed", async () => {
    const { 
      fieldContactType,
      fieldEmail,
      fieldName,
      fieldPhone
     } = await events(fill);

    expect(fieldName.value).toEqual(fill.name);
    expect(fieldPhone.value).toEqual(fill.phone);
    expect(fieldEmail.value).toEqual(fill.email);
    expect(fieldContactType.value).toEqual(fill.contactType);
  });

  it("it should not be possible to submit the form if the 'name' field contains numbers", async () => {
    fill.name = "teste 48";
    const { btnSubmit, handleSubmit, container } = await events(fill);
    const appContainer = container;
    fireEvent.click(btnSubmit); 
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    expect(appContainer.innerHTML).toMatch(/apenas letras/i);
  });

  it("it should not be possible to submit the form if the 'name' field contains numbers", async () => {
    fill.name = "teste 48";
    const { btnSubmit, handleSubmit, container } = await events(fill);
    const appContainer = container;
    fireEvent.click(btnSubmit); 
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    expect(appContainer.innerHTML).toMatch(/apenas letras/i);
  });

  it("it should not be possible to submit the form if the 'name' field is empty", async () => {
    fill.name = "";
    const { btnSubmit, handleSubmit, container } = await events(fill);
    const appContainer = container;
    fireEvent.click(btnSubmit); 
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    expect(appContainer.innerHTML).toMatch(/campo obrigatório/i);
  });

  it("it should not be possible to submit the form if the 'phone' field does not have the correct number of digits", async () => {
    fill.phone = "(48) 99103-939";
    const { btnSubmit, handleSubmit, container } = await events(fill);
    const appContainer = container;
    fireEvent.click(btnSubmit); 
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    expect(appContainer.innerHTML).toMatch(/este campo deve conter 11 dígitos/i);
  });

  it("it should not be possible to submit the form if the 'phone' field is empty", async () => {
    fill.phone = "";
    const { btnSubmit, handleSubmit, container } = await events(fill);
    const appContainer = container;
    fireEvent.click(btnSubmit); 
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    expect(appContainer.innerHTML).toMatch(/campo obrigatório/i);
  });

  it("it should not be possible to submit the form if the 'email' field is not a valid email address", async () => {
    fill.email = "email.com";
    const { btnSubmit, handleSubmit, container } = await events(fill);
    const appContainer = container;
    fireEvent.click(btnSubmit); 
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    expect(appContainer.innerHTML).toMatch(/deve ser um e-mail válido/i);
  });

  it("it should not be possible to submit the form if the 'email' field is empty", async () => {
    fill.email = "";
    const { btnSubmit, handleSubmit, container } = await events(fill);
    const appContainer = container;
    fireEvent.click(btnSubmit);
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    expect(appContainer.innerHTML).toMatch(/campo obrigatório/i);
  });

  it("it should not be possible to submit the form if the 'contactType' field is empty", async () => {
    fill.contactType = "";
    const { btnSubmit, handleSubmit, container } = await events(fill);
    const appContainer = container;
    fireEvent.click(btnSubmit); 
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
    expect(appContainer.innerHTML).toMatch(/campo obrigatório/i);
  });

  it("should be possible to submit the form if all values are correctly", async () => {
    const contact: IContactValidation = {
      name: 'John',
      contactType: 'familiar',
      email: 'john.dee@someemail.com',
      phone: '(48) 34567-8901'
    };
    const { btnSubmit, handleSubmit } = await events(contact);
    
    fireEvent.click(btnSubmit); 
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
  });
})
