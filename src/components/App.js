import React, { useState } from 'react';
import './App.css';
import { authService } from '../firebase';
import AppRouter from './Routes';
console.log(authService);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
      <AppRouter isLoggedIn = {isLoggedIn}/>
  );
}

export default App;
