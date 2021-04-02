import { useState, useContext, useCallback, useEffect } from 'react';
// * Hooks
import useHttp from '../hooks/http.hook';
import useMessage from '../hooks/message.hook';
// * Context
import AuthContext from '../context/AuthContext';
// * Components
import Loader from '../components/Loader';
import LinksList from '../components/LinksList';

const LinksPage = () => {
  const { token, logout } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const { isLoading, request } = useHttp();
  const message = useMessage();

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (e) {
      if (e.message === 'Нет авторизации') {
        message(e.message);
        logout();
      }
    }
  }, [token, request, message, logout]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{!isLoading && <LinksList links={links} />}</>;
};

export default LinksPage;
