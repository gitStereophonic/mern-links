import { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// * Context
import AuthContext from '../context/AuthContext';
// * Hooks
import useHttp from '../hooks/http.hook';
// * Components
import LinkCard from '../components/LinkCard';
import Loader from '../components/Loader';

const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, isLoading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: 'Bearer ' + token,
      });
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{!isLoading && link && <LinkCard link={link} />}</>;
};

export default DetailPage;
