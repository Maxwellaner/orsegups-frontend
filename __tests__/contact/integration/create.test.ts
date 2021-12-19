import IContactRequest from '../../../src/domain/contact/IContactRequest';
import ContactService from '../../../src/domain/contact/ContactService';
import ContactRequest from '../../../src/domain/contact/ContactRequest';
import { IContactValidation } from '../../../src/components/contactForm/interface';
import faker from 'faker';

describe("Integration - Create contact service", () => {
  let request: IContactRequest;
  let service: ContactService;

  const contactData: IContactValidation = {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    contactType: 'friend',
    email: faker.internet.email(),
    phone: '53991039232'
  }

  beforeAll(() => {
    request = new ContactRequest();
    service = new ContactService(request);
  });

  it("should be able to create a contact", async () => {
    const contact = await service.create(contactData) as IContactValidation;
    expect(contact).toHaveProperty("id");
    expect(contact.name).toEqual(contactData.name);
  });

  it("should not be able to create an existing contact", async () => {
    const contact = await service.create(contactData) as string;
    expect(contact).toEqual('Este e-mail já existe! Confira na lista de contatos');
  });
});