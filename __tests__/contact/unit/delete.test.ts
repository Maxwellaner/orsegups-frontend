import IContactRequest from '../../../src/domain/contact/IContactRequest';
import ContactService from '../../../src/domain/contact/ContactService';
import ContactRequestInMemory from '../../../src/domain/contact/in-memory/ContactRequestInMemory';
import { IContactValidation } from '../../../src/components/contactForm/interface';

describe("Unit - Delete contact", () => {
  let mockRequest: IContactRequest;
  let service: ContactService;

  let contact: IContactValidation;

  beforeAll(async () => {
    mockRequest = new ContactRequestInMemory();
    service = new ContactService(mockRequest);

    contact = await service.create({
      name: 'Unit delete',
      contactType: 'familiar',
      email: 'unit-delete@gmail.com',
      phone: '53991039232'
    }) as IContactValidation;
  });

  it("should be able to delete a contact", async () => {
    const response = await service.delete(Number(contact?.id));
    expect(typeof response === 'string').toBeFalsy();
  });

  it("should not be able to delete an unexisting contact", async () => {
    const response = await service.delete(78868) as string;
    expect(response).toBe('Este contato não existe!');
  });
});