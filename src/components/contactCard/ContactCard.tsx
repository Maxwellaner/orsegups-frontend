import { maskPhone } from '../../utils/masks';
import { IContactValidation } from '../contactForm/interface';
import styles from './ContactCard.module.css';
import { Link } from 'react-router-dom';

type CardProps = {
  contact: IContactValidation;
}

export const ContactCard = ({ contact }: CardProps) => {
  const { name, email, phone, contactType } = contact;

  return (
    <Link to={`/contact/edit?id=${contact.id}`} className={styles.link}>
      <div className={styles.card}>
        <h3>{name}</h3>
        <div className={styles.info}>
          <p className={styles.email}>{email}</p>
          <p>{maskPhone(phone)}</p>
          <p>{contactType}</p>
          <div className={styles.footer}></div>
        </div>
      </div>
    </Link>
  );
}