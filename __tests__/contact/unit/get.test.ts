import IContactRequest from '../../../src/domain/contact/IContactRequest';
import ContactService from '../../../src/domain/contact/ContactService';
import ContactRequestInMemory from '../../../src/domain/contact/in-memory/ContactRequestInMemory';
import { IContactValidation } from '../../../src/components/contactForm/interface';

describe("Unit - Get contact", () => {
  let mockRequest: IContactRequest;
  let service: ContactService;

  let contactOne: IContactValidation;
  let contactTwo: IContactValidation;

  beforeAll(async () => {
    mockRequest = new ContactRequestInMemory();
    service = new ContactService(mockRequest);

    contactOne = await service.create({
      name: 'Unit get one',
      contactType: 'familiar',
      email: 'unit-web-get-one@gmail.com',
      phone: '53991039232'
    }) as IContactValidation;
    contactTwo = await service.create({
      name: 'Unit get two',
      contactType: 'familiar',
      email: 'unit-web-get-two@gmail.com',
      phone: '53991039232'
    }) as IContactValidation;
  });

  it("should be able to get a contact", async () => {
    const contact = await service.get(Number(contactOne.id)) as IContactValidation;
    expect(contact).toHaveProperty("name");
    expect(contact.name).toEqual('Unit get one');
  });

  it("should not be able to get an unexisting contact", async () => {
    const contact = await service.get(10) as string;
    expect(contact).toEqual('Este contato não existe!');
  });

  it("should be able to get many contacts", async () => {
    const contacts = await service.getAll();
    expect(contacts.length).toBeGreaterThan(0);
    expect(contacts.length).toEqual(2);
    expect(contacts[0].name).toEqual('Unit get one');
    expect(contacts[1].name).toEqual('Unit get two');
  });
});