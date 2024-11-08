import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppRouter from './Routes';
import { authService } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
console.log(authService);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로그인 확인 시작 여부 / 열자마자는 false
  const [init, setInit] = useState(false); 
  const auth = getAuth();

  useEffect (() => {
    // 회원 정보가 있는지 확인
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 유저 정보가 있다면
        setIsLoggedIn(true); // 로그인 돼 있어요!
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn = {isLoggedIn}/> : "Initializing..."}
      
    </>
  );
}

export default App;
