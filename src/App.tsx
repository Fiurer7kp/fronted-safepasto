import PastoMap from './components/PastoMap';
import AlertForm from './components/AlertForm';
import Login from './components/Login';
import { isAuthenticated, logout } from './services/authService';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [auth, setAuth] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  const handleLoginSuccess = (user?: { name?: string }) => {
    setAuth(true);
    setUserName(user?.name);
  };

  const handleLogout = () => {
    logout();
    setAuth(false);
    setUserName(undefined);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-left">
          <h1>🚨 SafePasto</h1>
          <p>Collaborative safety system for Pasto, Nariño</p>
        </div>
        <div className="header-right">
          {auth ? (
            <div className="user-bar">
              <span>{userName ? `Hi, ${userName}` : 'Session active'}</span>
              <button className="secondary" onClick={handleLogout}>Sign Out</button>
            </div>
          ) : null}
        </div>
      </header>

      {!auth ? (
        <div className="app-main single">
          <div className="form-panel">
            <Login onSuccess={handleLoginSuccess} />
          </div>
        </div>
      ) : (
        <div className="app-main">
          <div className="form-panel">
            <AlertForm />
          </div>
          <div className="map-panel">
            <PastoMap />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;