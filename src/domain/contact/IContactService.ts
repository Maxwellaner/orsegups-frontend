import { IContactValidation } from "../../components/form/interface";

export default interface IContactService {
  create(contact: IContactValidation): Promise<IContactValidation | string>;
  get(id: number): Promise<IContactValidation | string>;
  getAll(): Promise<IContactValidation[] | []>;
  put(id: number, contact: IContactValidation): Promise<IContactValidation | string>;
}