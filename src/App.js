import Rotas from './routes/rotas';
import './App.css';

import AuthProvider from './contexts/auth';
import {BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
          <Rotas/>
      </AuthProvider>
    </div>
  );
}

