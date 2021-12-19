import IContactService from "./IContactService";
import { normalizePhoneData } from "../../utils/normalizePhoneData";
import { IContactValidation } from "../../components/contactForm/interface";
import IContactRequest from "./IContactRequest";

export default class ContactService implements IContactService {
  constructor(private readonly requestService: IContactRequest) {}
  
  async create(contact: IContactValidation): Promise<IContactValidation | string> {
    return this.requestService.create(this.normalizeData(contact));
  }
  async put(id: number, contact: IContactValidation): Promise<IContactValidation | string> {
    return this.requestService.put(id, this.normalizeData(contact));
  }
  async get(id: number): Promise<IContactValidation | string> {
    return this.requestService.get(id);
  }
  async getAll(): Promise<IContactValidation[] | []> {
    return this.requestService.getAll();
  }
  private normalizeData(contact: IContactValidation): IContactValidation {
    contact.phone = normalizePhoneData(contact.phone);
    return contact;
  }
}