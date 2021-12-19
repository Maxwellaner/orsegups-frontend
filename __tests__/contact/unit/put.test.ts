import IContactRequest from '../../../src/domain/contact/IContactRequest';
import ContactService from '../../../src/domain/contact/ContactService';
import ContactRequestInMemory from '../../../src/domain/contact/in-memory/ContactRequestInMemory';
import { IContactValidation } from '../../../src/components/contactForm/interface';


describe("Unit - Put contact", () => {
  let mockRequest: IContactRequest;
  let service: ContactService;

  let contact: IContactValidation;

  beforeAll(async () => {
    mockRequest = new ContactRequestInMemory();
    service = new ContactService(mockRequest);

    contact = await service.create({
      name: 'Unit put',
      contactType: 'familiar',
      email: 'unit-put@gmail.com',
      phone: '53991039232'
    }) as IContactValidation;
  });

  it("should be able to update a contact", async () => {
    const name = "New name";
    const payload = {
      name,
      contactType: 'familiar',
      email: 'unit-put@gmail.com',
      phone: '53991039232'
    }
    const response = await service.put(Number(contact.id), payload) as IContactValidation;
    expect(response.name).toEqual(name);
  });

  it("should not be able to update a contact that not exists", async () => {
    const name = "New name";
    const payload = {
      name,
      contactType: 'familiar',
      email: 'unit-put@gmail.com',
      phone: '53991039232'
    }
    const response = await service.put(10, payload) as string;
    expect(response).toEqual('Este contato não existe!');
  });
});