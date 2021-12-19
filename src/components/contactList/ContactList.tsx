import { useEffect, useState } from "react";
import { ContactCard } from "../contactCard/ContactCard";
import { Container } from "../container/Container";
import { IContactValidation } from "../contactForm/interface";
import styles from './ContactList.module.css';
import { getAllContacts } from "../../domain/contact-form/functions";

export const ContactList = () => {
  const [contacts, setContacts] = useState<IContactValidation[] | []>();
  
  useEffect(() => {
    async function getContacts() {
      const response = await getAllContacts();
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