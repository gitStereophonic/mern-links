import { useState, useContext, useCallback, useEffect } from 'react';
// * Hooks
import useHttp from '../hooks/http.hook';
// * Context
import AuthContext from '../context/AuthContext';
// * Components
import Loader from '../components/Loader';
import LinksList from '../components/LinksList';

const LinksPage = () => {
  const { token } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const { isLoading, request } = useHttp();

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{!isLoading && <LinksList links={links} />}</>;
};

export default LinksPage;
