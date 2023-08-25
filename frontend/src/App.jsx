import { Outlet } from 'react-router-dom';
import { useState } from 'react';
// import './App.css'

// export const userContext = React.createContext({user: {}});

export default function App() {
  const [user, setUser] = useState({});

  return (
    <>
      <Outlet context={[user, setUser]} />
    </>
  );
}
