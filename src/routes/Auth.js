import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  
  const auth = getAuth();

  const onChange = (e) => {
    const {target:{name, value}} = e;

    if(name === 'email'){
     setEmail(value);
     }else if(name === 'password'){
       setPassword(value);
    }
  }
  

  const onSubmit = (e) => {
    e.preventDefault();
    if(newAccount){ // 만약 newAccount 값이 true라고 한다면
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in / 계정 생성 완료 후 할 일
          const user = userCredential.user; // 생성된 계정의 유저 정보 확인 / 변수에 담김
          console.log(user);
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    }else{
      // 로그인
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
    }
  }

  const toggleAccount = () => {
    setNewAccount(prev => !prev)// 이전 값이 뭐든 prev로 받고 그 값의
  }

  return(
    <div className="container mt-3">
      <h1>{newAccount ? '회원가입' : '로그인'}</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" onChange={onChange} placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginPW">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={onChange} />
        </Form.Group>
        <Button variant="primary" type="submit">{newAccount ? '회원가입' : '로그인'}</Button>
        <div>
          {error}
        </div>
      </Form>
      <hr />
      <Button variant="secondary" type="submit" onClick={toggleAccount}>{newAccount ? '로그인으로 전환' : '회원가입으로 전환'}</Button>
  </div>
  )
}
export default Auth;