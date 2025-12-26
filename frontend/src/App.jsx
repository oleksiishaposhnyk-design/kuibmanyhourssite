import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductPage from './pages/ProductPage'
import Admin from './pages/Admin'
import Header from './components/Header'
import { setToken } from './api'

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('auth');
    if (raw) {
      const parsed = JSON.parse(raw);
      setUser(parsed.user);
      setToken(parsed.token);
    }
  }, []);

  function onLogout() {
    localStorage.removeItem('auth');
    setUser(null);
    setToken(null);
    navigate('/');
  }

  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductPage user={user} />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<Admin user={user} />} />
        </Routes>
      </main>
    </div>
  )
}
