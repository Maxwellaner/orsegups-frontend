import { failAlert } from "../../components/alerts/alerts";
import { IContactValidation } from "../../components/contactForm/interface";
import ContactRequest from "../contact/ContactRequest";
import ContactService from "../contact/ContactService";

export async function getContact(id: string | null): Promise<IContactValidation | string | null> {
  if (id) {
    const serviceRequest = new ContactRequest();
    const service = new ContactService(serviceRequest);
    const response = await service.get(Number(id));

    return response as IContactValidation;
  }

  return null;
}

export async function getAllContacts(): Promise<IContactValidation[] | []> {
  const serviceRequest = new ContactRequest();
  const service = new ContactService(serviceRequest);
  const response = await service.getAll();
  return response;
}

export async function onSubmitFormContact(values: IContactValidation, callback: () => void) {
  const serviceRequest = new ContactRequest();
  const service = new ContactService(serviceRequest);
  const query = new URLSearchParams(window.location.search);
  const param = query.get("id");
  
  let response: IContactValidation | string;

  if (param) {
    response = await service.put(Number(param), values);
  } else {
    response = await service.create(values);
  }

  if (typeof response === 'string') { 
    failAlert({text: response as string});
  } else {
    callback();
  }
}
