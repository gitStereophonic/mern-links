import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
// * Hooks
import useHttp from '../hooks/http.hook';
// * Styles
import styles from './style.module.css';
import AuthContext from '../context/AuthContext';

const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');
  const handleChange = (e) => setLink(e.target.value);
  const handleClick = async () => {
    try {
      const data = await request(
        '/api/link/generate',
        'POST',
        {
          from: link,
        },
        { Authorization: `Bearer ${auth.token}` }
      );
      history.push(`/detail/${data.link._id}`);
    } catch (e) {}
  };
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className='row'>
      <div className={cx(styles.column, 'col', 's8', 'offset-s2')}>
        <div className='input-field'>
          <input
            placeholder='Вставьте ссылку'
            id='link'
            type='text'
            value={link}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <label htmlFor='link'>Ссылка</label>
        </div>
        <button
          className='btn waves-effect waves-light green'
          type='button'
          name='action'
          onClick={handleClick}
        >
          Создать
          <i className='material-icons right'>send</i>
        </button>
      </div>
    </div>
  );
};

export default CreatePage;
