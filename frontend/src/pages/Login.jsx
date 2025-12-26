import React, { useState } from 'react'
import API, { setToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    API.post('/auth/login', { email, password }).then(r => {
      const { token, user } = r.data;
      localStorage.setItem('auth', JSON.stringify({ token, user }));
      setToken(token);
      setUser(user);
      navigate('/');
    }).catch(err => alert('Invalid credentials'))
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button className="btn" type="submit">Login</button>
    </form>
  )
}
