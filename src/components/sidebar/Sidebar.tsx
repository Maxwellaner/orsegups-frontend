import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

export const Sidebar = () => 
  <aside className={styles.sidebar}>
    <img src="/images/logo-horizontal.svg" alt="Orsegups Logo" />
    <nav>
      <ul>
        <li>
          <Link to="/">
            Cadastrar contato
          </Link>
        </li>
        <li>
          <Link to="/contacts">
            Ver contatos
          </Link>
        </li>
      </ul>
    </nav>
  </aside>