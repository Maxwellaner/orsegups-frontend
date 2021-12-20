import { IContactValidation } from "../../../components/contactForm/interface";
import IContactRequest from "../IContactRequest";

export default class ContactRequestInMemory implements IContactRequest {
  private contacts: IContactValidation[] = [];
  
  create(contact: IContactValidation): Promise<string | IContactValidation> {
    const exists = this.contacts.find(item => {
      return contact.email === item.email;
    });
    if (exists) return Promise.resolve('Este e-mail já existe! Confira na lista de contatos');
    Object.assign(contact, {
      id: Math.random() * 100
    });
    this.contacts.push(contact);
    return Promise.resolve(contact);
  }
  put(id: number, contact: IContactValidation): Promise<string | IContactValidation> {
    const exists = this.contacts.find(item => {
      return id === item.id;
    });
    if (!exists) return Promise.resolve('Este contato não existe!');
    Object.assign(exists, {
      ...contact
    });
    return Promise.resolve(exists);
  }
  get(id: number): Promise<string | IContactValidation> {
    const contact = this.contacts.find(item => {
      return id === item.id;
    });
    if (!contact) return Promise.resolve('Este contato não existe!');
    return Promise.resolve(contact);
  }
  getAll(): Promise<IContactValidation[] | []> {
    return Promise.resolve(this.contacts);
  }
  delete(id: number): Promise<void | string> {
    const contact = this.contacts.find(item => {
      return id === item.id;
    });
    if (!contact) return Promise.resolve('Este contato não existe!');
    this.contacts = this.contacts.filter(item => item.id !== contact.id);
    return Promise.resolve();
  }
}