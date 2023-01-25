import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Style from './App.module.css';
import AuthMe from './components/authMe/authMe.jsx';
import Header from './components/header/header.jsx';
import Navbar from './components/navbar/navbar';
import Registration from './components/registration/registration.jsx';
import Profile from './pages/profile/profile.jsx';
import Users from './pages/users/users.jsx';
import { authMe } from './redux/slices/authSlice.js';
import Preloader from './components/common/Preloader/Preloader';
import User from './pages/users/user/user.jsx';

function App() {

  console.log('app')



  const isAuthMe = useSelector((state) => state.auth.isAuth)
  const dispatch = useDispatch()
 
  

  useEffect(() => {
    dispatch(authMe())
  }, [])


  // if (!isAuthMe) {
  //   return <Preloader />
  // }


  return (
    <div>
      <Header />
      <div className={Style.content}>
        <Navbar />
        <div className={Style.appContent}>
          {isAuthMe ?
            <Routes>
              <Route path={`/profile/:id?`} element={<Profile />} />
              <Route path='/users' element={<Users />} />
              <Route path='/:id?' element={<User />} />
            </Routes>
            :
            <Routes>
              <Route path='/auth' element={<Registration />} />
              <Route path='/login' element={<AuthMe />} />
            </Routes>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
