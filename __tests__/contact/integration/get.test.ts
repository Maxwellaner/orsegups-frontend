import IContactRequest from '../../../src/domain/contact/IContactRequest';
import ContactService from '../../../src/domain/contact/ContactService';
import ContactRequest from '../../../src/domain/contact/ContactRequest';
import { IContactValidation } from '../../../src/components/contactForm/interface';
import faker from 'faker';

describe("Integration - Get contact service", () => {
  let request: IContactRequest;
  let service: ContactService;

  let contacOne: IContactValidation;
  let contactTwo: IContactValidation;

  function getData(): IContactValidation {
    const data = {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      contactType: 'friend',
      email: faker.internet.email(),
      phone: '53991039232'
    }
    return data;
  }

  beforeAll(async () => {
    request = new ContactRequest();
    service = new ContactService(request);
    const one = getData();
    const two = getData();
    contacOne = await service.create(one) as IContactValidation;
    contactTwo = await service.create(two) as IContactValidation;
  });

  it("should be able to get a contact", async () => {
    const contactData = getData();
    const contact = await service.create(contactData) as IContactValidation;
    const response = await service.get(Number(contact?.id)) as IContactValidation;
    expect(response).toHaveProperty("id");
    expect(response.name).toEqual(contactData.name);
  });

  it("should not be able to get an unexisting contact", async () => {
    const contact = await service.get(100000000) as string;
    expect(contact).toEqual('Este contato não existe!');
  });

  it("should be able to get many contacts", async () => {
    const contacts = await service.getAll();
    expect(contacts.length).toBeGreaterThan(0);
  });
});