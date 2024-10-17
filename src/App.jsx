import './App.css'
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { SignIn,Register , ErrorPage} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
