import IContactRequest from '../../../src/domain/contact/IContactRequest';
import ContactService from '../../../src/domain/contact/ContactService';
import ContactRequestInMemory from '../../../src/domain/contact/in-memory/ContactRequestInMemory';
import { IContactValidation } from '../../../src/components/contactForm/interface';

describe("Unit - Contact service", () => {
  let mockRequest: IContactRequest;
  let service: ContactService;

  const contactData: IContactValidation = {
    name: 'Unit create',
    contactType: 'familiar',
    email: 'unit-create@gmail.com',
    phone: '53991039232'
  }

  beforeAll(() => {
    mockRequest = new ContactRequestInMemory();
    service = new ContactService(mockRequest);
  });

  it("should be able to create a contact", async () => {
    const contact = await service.create(contactData) as IContactValidation;
    expect(contact).toHaveProperty("id");
    expect(contact.name).toEqual('Unit create');
  });

  it("should not be able to create an existing contact", async () => {
    const contact = await service.create(contactData) as string;
    expect(contact).toEqual('Este e-mail já existe! Confira na lista de contatos');
  });
});