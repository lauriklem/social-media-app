import React from 'react';
import { Welcome, SignUp, NoPage, SignIn, Home, SignOut, Profile } from 'pages';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { NavbarLogin, NavbarApp } from 'components';
import './styles/global.css';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['login-token']);

  const setLoginToken = (token) => {
    setCookie('login-token', token);
  };

  const deleteLoginToken = () => {
    removeCookie('login-token');
  }

  return (
    cookies['login-token'] ?
      <BrowserRouter>
        <NavbarApp />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signout' element={<SignOut deleteLoginToken={deleteLoginToken} />} />
          <Route path='profile' element={<Profile />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      :
      <BrowserRouter>
        <NavbarLogin />
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn setLoginToken={setLoginToken} />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
