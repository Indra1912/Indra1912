import './App.css';
import React from 'react';
//import {Home} from './components/Home'
import { Login } from './components/Login'
import { Admin } from './components/admin'
import { Voter } from './components/voter'
import { AdminLogin } from './components/AdminLogin';
import { Navigation } from './components/Navigation'
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="container">
      <h3 className="mt -5 d-flex justify-content-center">E-VOTING PORTAL</h3>
      <Navigation />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/admin' element={<Admin />} />
        <Route exact path='/voter' element={<Voter />} />
        <Route exact path='/AdminLogin' element={<AdminLogin />} />
        <Route component={Login} />
      </Routes>
    </div>
  );
}

export default App;
