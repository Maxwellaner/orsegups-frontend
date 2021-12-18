import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

export const Sidebar = () => 
  <aside className={styles.sidebar}>
    <img src="/images/logo-horizontal.svg" alt="Orsegups Logo" />
    <nav>
      <ul>
        <li>
          <Link to="/" onClick={window.location.reload}>
            Cadastrar contato
          </Link>
        </li>
        <li>
          <Link to="/contacts">
            Lista de contatos
          </Link>
        </li>
      </ul>
    </nav>
  </aside>