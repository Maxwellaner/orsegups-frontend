import { Formik, FormikHelpers } from "formik";
import { Container } from "../container/Container";
import styles from './ContactForm.module.css';
import { IContactValidation } from "./interface";
import { useEffect, useState } from "react";
import { maskPhone } from "../../utils/masks";
import ContactService from "../../domain/contact/ContactService";
import { failAlert, successAlert } from "../alerts/alerts";
import { useQuery } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import validate from '../../validations/contact/contact.schema';

const getInitialValues = (values?: IContactValidation | null) => {
  return {
    name: values?.name || '',
    phone: values?.phone || '',
    email: values?.email || '',
    contactType: values?.contactType || ''
  } as IContactValidation
}

export const ContactForm = () => {
  const [contact, setContact] = useState<IContactValidation | null>(null);
  const [initialValues, setInitialValues] = useState<IContactValidation | null>(null);

  const query = useQuery();
  const navigate = useNavigate();

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

  const onSubmit = async (
    values: IContactValidation,
    actions: FormikHelpers<IContactValidation>
  ) => {
    const service = new ContactService();
    const param = query.get("id");
    let response: IContactValidation | string;
    let text: string;

    if (param) {
      response = await service.put(Number(param), values);
      text = 'alterado';
    } else {
      response = await service.create(values);
      text = 'cadastrado';
    }

    if (typeof response === 'string') { 
      failAlert({text: response as string});
    } else {
      successAlert({ text: `Contato ${text} com sucesso!` })
        .then(() => {
          navigate('/contacts');
        });
    }
  }

  return (
    <Container>
      <div className={styles.containerForm}>
        <h4>{contact ? 'Editar contato' : 'Contate-nos'}</h4>
        <Formik
          initialValues={getInitialValues(initialValues)}
          onSubmit={onSubmit}
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
                placeholder="Nome"
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <span className={styles.error}>{errors.name && touched.name && errors.name}</span>
              <input
                onChange={e => {
                  values.phone = '';
                  setInitialValues({
                    ...values as IContactValidation,
                    phone: maskPhone(e.target.value)
                  })
                }}   
                placeholder="Telefone"
                type="phone"
                name="phone"
                onBlur={handleBlur}
                value={(values.phone ? maskPhone(values.phone) : initialValues?.phone)}
              />
              <span className={styles.error}>{errors.phone && touched.phone && errors.phone}</span>
              <input
                placeholder="E-mail"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email ? values.email : ''}
              />
              <span className={styles.error}>{errors.email && touched.email && errors.email}</span>
              <select
                name="contactType"
                value={values.contactType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="" hidden label="Selecione o tipo" />
                <option value="familiar" label="Familiar" />
                <option value="friend" label="Amigo" />
                <option value="professional" label="Profissional" />
              </select>
              <span className={styles.error}>{errors.contactType && touched.contactType && errors.contactType}</span>
              <button type="submit" disabled={isSubmitting}>
                Cadastrar
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
}