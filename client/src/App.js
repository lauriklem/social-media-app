import React from 'react';
import { Welcome, SignUp, NoPage, SignIn, Home, SignOut, Profile, SignOutSuccess } from 'pages';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { NavbarApp, Background } from 'components';
import './styles/global.css';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['login-token', 'username']);

  const setLoginToken = (token) => {
    setCookie('login-token', token);
  };

  const deleteLoginToken = () => {
    removeCookie('login-token');
  };

  const setUser = (username) => {
    setCookie('username', username)
  };

  const removeUser = () => {
    removeCookie('username')
  };

  // Navigation bar buttons
  const navButtonsApp = [
    {
      to: '/',
      text: 'Home'
    },
    {
      to: '/profile',
      text: 'Profile'
    },
    {
      to: '/signout',
      text: 'Sign out'
    },
  ];

  const navButtonsLogin = [
    {
      to: '/',
      text: 'Home'
    },
    {
      to: '/signup',
      text: 'Sign up'
    },
    {
      to: '/signin',
      text: 'Sign in'
    },
  ];

  return (
    <Background>
      {cookies['login-token'] ?
        <BrowserRouter>
          <NavbarApp buttons={navButtonsApp} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='signout'
              element={<SignOut deleteLoginToken={deleteLoginToken} removeUser={removeUser} />} />
            <Route path='profile/*'
              element={
                <Profile
                  cookies={cookies}
                  setUser={setUser}
                  setLoginToken={setLoginToken}
                  deleteLoginToken={deleteLoginToken}
                  removeUser={removeUser}
                />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </BrowserRouter>
        :
        <BrowserRouter>
          <NavbarApp buttons={navButtonsLogin} />
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<SignIn setLoginToken={setLoginToken} setUser={setUser} />} />
            <Route path='signoutsuccess' element={<SignOutSuccess />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </BrowserRouter>}
    </Background>
  );
}

export default App;
