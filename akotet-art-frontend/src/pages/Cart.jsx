import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { useCart } from './CartContext';
import '../styles/cart.css';

function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleQuantityChange = (product_id, quantity) => {
    const parsedQuantity = parseInt(quantity, 10);
    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      updateQuantity(product_id, parsedQuantity);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (cart.length === 0) {
      setError(t('cart.empty'));
      return;
    }

    if (!file) {
      setError(t('order.file_required'));
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError(t('order.login_required'));
      navigate('/login');
      return;
    }

    const items = cart.map(({ product_id, quantity }) => ({ product_id, quantity }));
    console.log('Cart items to submit:', items);

    const formData = new FormData();
    formData.append('items', JSON.stringify(items));
    formData.append('payment_screenshot', file);

    // Log FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`FormData ${key}:`, value);
    }

    try {
      const response = await axios.post('/orders', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Order success:', response.data);
      clearCart();
      alert(t('order.success'));
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      console.error('Order error:', {
        message: errorMessage,
        status: err.response?.status,
        response: err.response?.data,
      });
      if (errorMessage === 'Invalid or expired token') {
        setError(t('order.session_expired'));
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError(errorMessage || t('order.error'));
      }
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <header>
          <div className="logo">አኮቴት አርት</div>
          <nav>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/browse">{t('nav.browse')}</Link>
            <Link to="/login">{t('nav.login')}</Link>
            <Link to="/signup">{t('nav.signup')}</Link>
          </nav>
        </header>
        <main>
          <h1>{t('cart.title')}</h1>
          <p>{t('cart.empty')}</p>
          <Link to="/browse" className="btn-browse">
            {t('nav.browse')}
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <header>
        <div className="logo">አኮቴት አርት</div>
        <nav>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/browse">{t('nav.browse')}</Link>
          <Link to="/login">{t('nav.login')}</Link>
          <Link to="/signup">{t('nav.signup')}</Link>
        </nav>
      </header>
      <main>
        <h1>{t('cart.title')}</h1>
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.product_id} className="cart-item">
              <img src={item.image_url} alt={item.title} />
              <div className="item-details">
                <h2>{item.title}</h2>
                <p>{t('product.price')}: {item.price} ብር</p>
                <div className="quantity-selector">
                  <label>{t('product.quantity')}:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.product_id, e.target.value)}
                  />
                </div>
                <p>{t('cart.subtotal')}: {(item.price * item.quantity).toFixed(2)} ብር</p>
                <button
                  className="btn-remove"
                  onClick={() => removeItem(item.product_id)}
                >
                  {t('cart.remove')}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>{t('cart.total')}: {calculateTotal()} ብር</h2>
          <form onSubmit={handleSubmitOrder}>
            <div className="file-upload">
              <label htmlFor="payment_screenshot">{t('order.upload_screenshot')}:</label>
              <input
                type="file"
                id="payment_screenshot"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="btn-submit-order">
              {t('order.submit_order')}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Cart;