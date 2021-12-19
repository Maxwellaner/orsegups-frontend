import { IContactValidation } from "../../components/contactForm/interface";

export default interface IContactRequest {
  create(contact: IContactValidation): Promise<IContactValidation | string>;
  get(id: number): Promise<IContactValidation | string>;
  getAll(): Promise<IContactValidation[] | []>;
  put(id: number, contact: IContactValidation): Promise<IContactValidation | string>;
}