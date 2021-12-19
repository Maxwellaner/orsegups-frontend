import { Formik } from "formik";
import { Container } from "../container/Container";
import styles from './ContactForm.module.css';
import { IContactValidation } from "./interface";
import { useEffect, useState } from "react";
import { maskPhone } from "../../utils/masks";
import ContactService from "../../domain/contact/ContactService";
import { failAlert, successAlert } from "../alerts/alerts";
import { useQuery } from "../hooks/hooks";
import validate from '../../validations/contact/contact.schema';
import { useNavigate } from "react-router-dom";

const getInitialValues = (values?: IContactValidation | null) => {
  return {
    name: values?.name || '',
    phone: values?.phone || '',
    email: values?.email || '',
    contactType: values?.contactType || ''
  } as IContactValidation
}

type ContactFormProps = {
  onSubmit: (values: IContactValidation, callback: () => void) => void;
}

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [contact, setContact] = useState<IContactValidation | null>(null);
  const [initialValues, setInitialValues] = useState<IContactValidation | null>(null);

  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);

  useEffect(() => {
    async function getContact() {
      const param = query.get("id");
      if (param) {
        const service = new ContactService();
        const response = await service.get(Number(param));
        
        if (typeof response === 'string') failAlert({text: response as string});
        setContact(response as IContactValidation);
      }
    }

    getContact();
  }, [])

  useEffect(() => {
    setInitialValues(contact);
  }, [contact]);

  const afterSubmit = () => {
    let text: string = '';
    if (query.get("id")) {
      text = 'alterado';
    } else {
      text = 'cadastrado';
    }
    
    successAlert({ text: `Contato ${text} com sucesso!` })
        .then(() => {
          navigate('/contacts');
        });
  }

  return (
    <Container>
      <div className={styles.containerForm}>
        <h4>{contact ? 'Editar contato' : 'Contate-nos'}</h4>
        <Formik
          initialValues={getInitialValues(initialValues)}
          onSubmit={(values) => onSubmit(values, afterSubmit)}
          validationSchema={validate.create}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                data-testid='fieldName'
                placeholder="Nome"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <span className={styles.error}>{errors.name && touched.name && errors.name}</span>
              <input  
                data-testid='fieldPhone'
                placeholder="Telefone"
                type="text"
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone = maskPhone(values.phone)}
              />
              <span className={styles.error}>{errors.phone && touched.phone && errors.phone}</span>
              <input
                data-testid='fieldEmail'
                placeholder="E-mail"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email ? values.email : ''}
              />
              <span className={styles.error}>{errors.email && touched.email && errors.email}</span>
              <select
                data-testid='fieldContactType'
                name="contactType"
                value={values.contactType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option data-testid='fieldContactType-option' value="" hidden>Selecione uma opção</option>
                <option data-testid='fieldContactType-option' value="familiar">Familiar</option>
                <option data-testid='fieldContactType-option' value="friend">Amigo</option>
                <option data-testid='fieldContactType-option' value="professional">Profissional</option>
              </select>
              <span className={styles.error}>{errors.contactType && touched.contactType && errors.contactType}</span>
              <button data-testid='btnSubmit' type="submit" disabled={isSubmitting}>
                { contact ? 'Salvar' : 'Cadastrar' }
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}