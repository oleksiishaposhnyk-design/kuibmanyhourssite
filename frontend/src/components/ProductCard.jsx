import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ p }) {
  return (
    <div className="card">
      <img src={p.image || 'https://via.placeholder.com/300x200?text=Fish'} alt={p.title} />
      <h3>{p.title}</h3>
      <p>{p.description}</p>
      <div className="price">{p.price} UAH</div>
      <Link to={`/product/${p._id}`} className="btn">Buy</Link>
    </div>
  )
}
