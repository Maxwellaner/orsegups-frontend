import IContactRequest from '../../../src/domain/contact/IContactRequest';
import ContactService from '../../../src/domain/contact/ContactService';
import ContactRequest from '../../../src/domain/contact/ContactRequest';
import { IContactValidation } from '../../../src/components/contactForm/interface';
import faker from 'faker';

describe("Integration - Put contact", () => {
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

  it("should not be able to update a contact that not exists", async () => {
    const response = await service.put(100000, contactData) as string;
    expect(response).toEqual('Este contato não existe!');
  });
});