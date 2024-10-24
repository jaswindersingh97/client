import './App.css'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom';
import { SignIn,Register , ErrorPage, Dashboard, AnalyticsPage, SettingsPage} from './pages';
import { MainPageLayout ,ProtectedRoute} from './components';
import SharePage from './pages/SharePage/SharePage';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<ProtectedRoute element={<MainPageLayout />}/>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path='/share/:TaskId' element={<SharePage/>}/>
        <Route path='/register' element={<ProtectedRoute isPublic={true} element={<Register/>}/>}/>
        <Route path='/signIn' element={<ProtectedRoute isPublic={true} element={<SignIn/>}/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
