import './App.css'
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Home , ErrorPage} from './pages';
import Register from './pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/signIn' element={<Home/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
