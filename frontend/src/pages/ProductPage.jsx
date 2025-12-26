import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api'

export default function ProductPage({ user }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get('/products').then(r => {
      const p = r.data.find(x => x._id === id);
      setProduct(p);
    })
  }, [id]);

  if (!product) return <div>Loading...</div>

  function startPayment() {
    API.post('/payment/create', { productId: product._id }).then(r => {
      const { data, signature, public_key } = r.data;
      // Create a form and submit to LiqPay
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://www.liqpay.ua/api/3/checkout';
      form.style.display = 'none';

      const inputData = document.createElement('input');
      inputData.name = 'data';
      inputData.value = data;
      form.appendChild(inputData);

      const inputSign = document.createElement('input');
      inputSign.name = 'signature';
      inputSign.value = signature;
      form.appendChild(inputSign);

      document.body.appendChild(form);
      form.submit();
    }).catch(err => alert('Payment error'))
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image || 'https://via.placeholder.com/600x400?text=Fish+Image'} alt={product.title} style={{ maxWidth: '100%', height: 'auto' }} />
      <p>{product.description}</p>
      <div className="price">{product.price} UAH</div>
      <button onClick={startPayment} className="btn">Pay with LiqPay</button>
    </div>
  )
}
