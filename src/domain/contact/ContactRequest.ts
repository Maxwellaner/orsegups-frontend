import { IContactValidation } from "../../components/contactForm/interface";
import IContactRequest from "./IContactRequest";
import axios from '../../axios/axios';

export default class ContactRequest implements IContactRequest {
  async create(contact: IContactValidation): Promise<string | IContactValidation> {
    try {
      const response = await axios.post('/contacts/create', contact);
      return response.data;
    } catch(error: any) {
      return error.response.data.message;
    }
  }
  async put(id: number, contact: IContactValidation): Promise<string | IContactValidation> {
    try {
      const response = await axios.put(`/contacts/${id}`, contact);
      return response.data;
    } catch(error: any) {
      return error.response.data.message;
    }
  }
  async get(id: number): Promise<string | IContactValidation> {
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
  async delete(id: number): Promise<void> {
    try {
      return await axios.delete(`/contacts/${id}`);
    } catch(error: any) {
      return error.response.data.message;
    }
  }
}