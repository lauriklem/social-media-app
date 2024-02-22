import React from 'react';
import { Welcome, SignUp, NoPage, SignIn, Home } from 'pages';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useCookies, CookiesProvider } from 'react-cookie';
import { NavbarLogin } from 'components';
import './styles/global.css';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['login-token']);

  return (
    <CookiesProvider defaultSetOptions={{ path: '/', sameSite: "lax" }}>
      {
        cookies['login-token'] ? 
        <Home />
        :
        <BrowserRouter>
          <NavbarLogin />
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<SignIn setCookie={setCookie}/>} />
            <Route path='*' element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      }
    </CookiesProvider>

  );
}

export default App;
