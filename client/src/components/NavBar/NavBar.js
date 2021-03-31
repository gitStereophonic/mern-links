import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import cx from 'classnames';
// * Context
import AuthContext from '../../context/AuthContext';
// * Styles
import styles from './styles.module.css';

const NavBar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <nav>
      <div className={cx('nav-wrapper', 'blue', 'darken-1', styles.nav)}>
        <span className='brand-logo'>Сокращение ссылок</span>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <NavLink to='/create'>Создать</NavLink>
          </li>
          <li>
            <NavLink to='/links'>Ссылки</NavLink>
          </li>
          <li>
            <a href='/' onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
