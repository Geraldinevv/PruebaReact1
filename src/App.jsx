import React, { useState } from 'react';
import './App.css';
import MiApi from './Components/MiApi';

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);

  const handleDismissLandingPage = () => {
    setShowLandingPage(false);
  };

  return (
    <div className="App">
      {showLandingPage ? (
        <div className="landing-page">
          <h1>Bienvenido a Mi Aplicación</h1>
          <button onClick={handleDismissLandingPage}>Continuar</button>
        </div>
      ) : (
        <div>
          <MiApi />
        </div>
      )}
    </div>
  );
}
export default App;
