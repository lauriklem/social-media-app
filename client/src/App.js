import React from 'react';
import { Welcome, SignUp, NoPage, SignIn, Home, SignOut, Profile, SignOutSuccess, NewPost, MyPosts } from 'pages';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { NavbarApp, Background } from 'components';
import './styles/global.css';

function App() {
  const serverUrl = "http://127.0.0.1:3001/";

  // Login token is used for authorization, username for identifying current user
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

  // Navigation bar buttons inside app
  const navButtonsApp = [
    {
      to: '/',
      text: 'Home'
    },
    {
      to: '/newpost',
      text: 'Create post'
    },
    {
      to: '/myposts',
      text: 'My posts'
    },
    {
      to: '/profile',
      text: 'My profile'
    },
    {
      to: '/signout',
      text: 'Sign out'
    },
  ];

  // Navigation bar buttons before logging in
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

      // App after login
        <BrowserRouter>
          <NavbarApp buttons={navButtonsApp} />
          <Routes>
            <Route path='/' element={<Home cookies={cookies} serverUrl={serverUrl}/>} />
            <Route path='/newpost' element={<NewPost cookies={cookies} serverUrl={serverUrl}/>} />
            <Route path='/myposts' element={<MyPosts cookies={cookies} serverUrl={serverUrl}/>} />
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
                  serverUrl={serverUrl}
                />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </BrowserRouter>
        :

        // App before login
        <BrowserRouter>
          <NavbarApp buttons={navButtonsLogin} />
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='signup' element={<SignUp serverUrl={serverUrl} />} />
            <Route path='signin' 
            element={<SignIn setLoginToken={setLoginToken} setUser={setUser} serverUrl={serverUrl} />} />
            <Route path='signoutsuccess' element={<SignOutSuccess />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </BrowserRouter>}
    </Background>
  );
}

export default App;
