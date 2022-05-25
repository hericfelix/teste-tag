import React from 'react';
import './App.css';
import Providers from './providers';
import AppRoutes from './routes';

function App() {
  return (
    <Providers>
      <AppRoutes />;
    </Providers>
  );
}

export default App;
