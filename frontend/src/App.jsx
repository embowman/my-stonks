import { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { api } from "./utilities.jsx";
// import './App.css'

// export const userContext = React.createContext({user: {}});

export default function App() {
  // need to include [user, setUser] useState in context
  // how does one include multiple useStates?
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  const whoAmI = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      const response = await api.get('info/');
      setUser(response.data['email']);
      navigate('/watchlist');
    } else {
      setUser(null);
      navigate('/login');
    }
  };

  useEffect(() => {
    whoAmI();
  }, []);

  return (
    <>
      <Outlet context={ [[user, setUser], [watchlist, setWatchlist]] } />
    </>
  );
}
