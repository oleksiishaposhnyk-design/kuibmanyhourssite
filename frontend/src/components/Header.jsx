import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Fish Market</Link>
        <nav>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <span style={{ marginLeft: 10 }}>{user.email}</span>
              <button onClick={onLogout} className="btn">Logout</button>
              {user.role === 'admin' && <Link to="/admin" className="btn">Admin</Link>}
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
