import React, { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleAuth = (username: string, pin: string) => {
    // In a real app, you'd validate against a backend
    setUsername(username);
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <Auth onAuth={handleAuth} />
      ) : (
        <Dashboard username={username} />
      )}
    </div>
  );
}

export default App;