import './App.css'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { SignIn,Register , ErrorPage, Dashboard, AnalyticsPage, SettingsPage} from './pages';
import { MainPageLayout } from './components';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
