import IContactRequest from '../../../src/domain/contact/IContactRequest';
import ContactService from '../../../src/domain/contact/ContactService';
import ContactRequest from '../../../src/domain/contact/ContactRequest';
import { IContactValidation } from '../../../src/components/contactForm/interface';
import faker from 'faker';

describe("Unit - Delete contact", () => {
  let request: IContactRequest;
  let service: ContactService;

  let contact: IContactValidation;

  const contactData: IContactValidation = {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    contactType: 'friend',
    email: faker.internet.email(),
    phone: '53991039232'
  }

  beforeAll(async () => {
    request = new ContactRequest();
    service = new ContactService(request);
    contact = await service.create(contactData) as IContactValidation;
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