import React, { useEffect, useState } from 'react'
import API from '../api'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products').then(r => setProducts(r.data)).catch(console.error)
  }, []);

  return (
    <div>
      <h1>Fish Market — Fresh fish daily</h1>
      <div className="grid">
        {products.map(p => <ProductCard key={p._id} p={p} />)}
      </div>
    </div>
  )
}
