import { useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Notification from './pages/Notification.jsx'
import Notfound from './pages/Notfound.jsx' 
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader/Loader.jsx'
import useAuthUser from './components/Hook/useAuthUser.js'
import Layout from './pages/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'
import ChatArea from './pages/Chat.jsx'
import CallArea from './pages/Call.jsx'


function App() {

  const { isLoading, authUser } = useAuthUser();
  const { theme, setTheme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  // console.log({ data });
  // console.log({ isLoading });
  // console.log({ error });

  if (isLoading) return <Loader />;

  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <Home />
          </Layout>
        )
          :
          (
            <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
          )}
        />
        <Route path='/signup' element={!isAuthenticated ? <Signup /> : <Navigate to={
          !isOnboarded ? '/onboarding' : '/'
        } />} />
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to={
          !isOnboarded ? '/onboarding' : '/'
        } />} />
        <Route path='/onboarding' element={isAuthenticated ? (
          !isOnboarded ? (
            <Onboarding />
          )
            :
            (
              <Navigate to='/' />
            ))
          :
          (
            <Navigate to='/login' />
          )}
        />
        <Route path='/notifications' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <Notification />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
        )} />
        <Route path='/call/:id' element={
          isAuthenticated && isOnboarded ? ( 
            <CallArea /> 
        ) : (
          <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
        )} />
        <Route path='/chat/:id' element={
          isAuthenticated && isOnboarded ? (
          <Layout showSidebar={false}>
            <ChatArea />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
        )} />
        <Route path='*' element={<Notfound />} />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
