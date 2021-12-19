import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { ContactPage } from './components/contact/ContactPage';
import { ContactList } from './components/contactList/ContactList';
import { ContactForm } from './components/contactForm/ContactForm';
import { Sidebar } from './components/sidebar/Sidebar';
import { IContactValidation } from './components/contactForm/interface';
import ContactService from './domain/contact/ContactService';
import { failAlert, successAlert } from './components/alerts/alerts';
import { useCallback } from 'react';

function App() {
  const onSubmit = useCallback(
    async (
      values: IContactValidation,
      callback: () => void
    ) => {
      const service = new ContactService();
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
    },
    []
  )

  return (
    <main className={styles.main}>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<ContactForm onSubmit={onSubmit} />} />
          <Route path="/contact/:id" element={<ContactPage />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/contact/edit" element={<ContactForm onSubmit={onSubmit} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
