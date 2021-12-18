import IContactService from "./IContactService";
import axios from "../../axios/axios";
import { normalizePhoneData } from "../../utils/normalizePhoneData";
import { IContactValidation } from "../../components/contactForm/interface";

export default class ContactService implements IContactService {
  async create(contact: IContactValidation): Promise<IContactValidation | string> {
    contact.phone = normalizePhoneData(contact.phone);
    try {
      const response = await axios.post('/contacts/create', contact);
      return response.data;
    } catch(error: any) {
      return error.response.data.message;
    }
  }
  async put(id: number, contact: IContactValidation): Promise<IContactValidation | string> {
    try {
      const response = await axios.put(`/contacts/${id}`, contact);
      return response.data;
    } catch(error: any) {
      return error.response.data.message;
    }
  }
  async get(id: number): Promise<IContactValidation | string> {
    try {
      const response = await axios.get(`/contacts/${id}`);
      return response.data;
    } catch(error: any) {
      return error.response.data.message;
    }
  }
  async getAll(): Promise<IContactValidation[] | []> {
    try {
      const response = await axios.get('/contacts');
      return response.data as IContactValidation[] | [];
    } catch(error: any) {
      return error.response.data.message;
    }
  }
}