import React, { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    API.post('/auth/register', { email, password }).then(r => {
      alert('Registered. Please login.');
      navigate('/login');
    }).catch(err => alert('Registration error'))
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>Register</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button className="btn" type="submit">Register</button>
    </form>
  )
}
