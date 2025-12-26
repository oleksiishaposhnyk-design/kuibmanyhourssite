import React, { useState, useEffect } from 'react'
import API from '../api'

export default function Admin({ user }) {
  if (!user || user.role !== 'admin') return <div>Admin only</div>

  const [orders, setOrders] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    API.get('/orders').then(r => setOrders(r.data)).catch(console.error);
  }, []);

  function submit(e) {
    e.preventDefault();
    API.post('/products', { title, description: desc, price: Number(price), image })
      .then(r => { alert('Product added'); setTitle(''); setDesc(''); setPrice(''); setImage(''); })
      .catch(err => alert('Error'))
  }

  return (
    <div>
      <h2>Admin Panel — Add Product</h2>
      <form onSubmit={submit} className="form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
        <button className="btn">Add product</button>
      </form>

      <h2 style={{ marginTop: 40 }}>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o.order_id}</td>
              <td>{o.user?.email}</td>
              <td>{o.product?.title}</td>
              <td>{o.amount} UAH</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
