import { useState, useEffect, useContext } from 'react';
import cx from 'classnames';
// * Context
import AuthContext from '../context/AuthContext';
// * Hooks
import useHttp from '../hooks/http.hook';
import useMessage from '../hooks/message.hook';
// * Styles
import styles from './style.module.css';

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { isLoading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1 className='center'>Ебани ссылку</h1>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Авторизация</span>
            <div>
              <div className='input-field'>
                <input
                  placeholder='Введите email'
                  id='email'
                  type='email'
                  name='email'
                  className='yellow-input validate'
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Email</label>
                <span className='helper-text' data-error='Невалидный email' />
              </div>
              <div className='input-field'>
                <input
                  placeholder='Введите пароль'
                  id='password'
                  type='password'
                  name='password'
                  className='yellow-input'
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor='password'>Пароль</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              className={cx(
                'btn',
                'green',
                'darken-2',
                'waves-effect',
                'waves-light',
                styles.button
              )}
              style={{ marginRight: 10 }}
              type='button'
              disabled={isLoading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className={cx(
                'btn',
                'grey',
                'lighten-1',
                'black-text',
                'waves-effect',
                'waves-light',
                styles.button
              )}
              onClick={registerHandler}
              type='button'
              disabled={isLoading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
