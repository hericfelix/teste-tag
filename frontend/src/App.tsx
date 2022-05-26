import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Providers from './providers';
import AppRoutes from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Providers>
      <ToastContainer />
      <AppRoutes />
    </Providers>
  );
}

export default App;
