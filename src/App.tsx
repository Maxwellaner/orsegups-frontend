import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { ContactPage } from './components/contact/ContactPage';
import { ContactList } from './components/contactList/ContactList';
import { ContactForm } from './components/contactForm/ContactForm';
import { Sidebar } from './components/sidebar/Sidebar';
import { onSubmitFormContact } from './domain/contact-form/functions';

function App() {
  return (
    <main className={styles.main}>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<ContactForm onSubmit={onSubmitFormContact} />} />
          <Route path="/contact/:id" element={<ContactPage />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/contact/edit" element={<ContactForm onSubmit={onSubmitFormContact} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
