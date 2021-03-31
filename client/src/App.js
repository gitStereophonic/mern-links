import { BrowserRouter as Router } from 'react-router-dom';
// * Routes
import useRoutes from './routes';
// * Hooks
import useAuth from './hooks/auth.hook';
// * Context
import AuthContext from './context/AuthContext';
// * Components
import NavBar from './components/NavBar';
import Loader from './components/Loader';
// * Styles
import 'materialize-css';

function App() {
  const { token, userId, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      <Router>
        {isAuthenticated && <NavBar />}
        <div className='container'>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
