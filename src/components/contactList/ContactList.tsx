import { useEffect, useState } from "react";
import ContactService from "../../domain/contact/ContactService";
import { ContactCard } from "../contactCard/ContactCard";
import { Container } from "../container/Container";
import { IContactValidation } from "../contactForm/interface";
import styles from './ContactList.module.css';

export const ContactList = () => {
  const [contacts, setContacts] = useState<IContactValidation[] | []>();
  
  useEffect(() => {
    async function getContacts() {
      const service = new ContactService();
      const response = await service.getAll();
      setContacts(response);
    }

    getContacts();
  }, [])

  return (
    <Container>
      <div className={styles.content}>
        <h4>Lista de Contatos</h4>
        <div className={styles.cardList}>
          {contacts?.map(contact => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
    </Container>
  );
}