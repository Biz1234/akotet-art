import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { useCart } from './CartContext';
import '../styles/product-detail.css';

function ProductDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setError(t('product.error'));
        setLoading(false);
      });
  }, [id, t]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && (!product || value <= product.quantity)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0 && product) {
      addToCart(product, quantity);
      alert(t('cart.added'));
      navigate('/cart');
    } else {
      setError(t('cart.invalid_quantity'));
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error && !product) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="product-detail-container">
      <header>
        <div className="logo">አኮቴት አርት</div>
        <nav>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/browse">{t('nav.browse')}</Link>
          <Link to="/cart">{t('nav.cart')}</Link>
          <Link to="/login">{t('nav.login')}</Link>
          <Link to="/signup">{t('nav.signup')}</Link>
        </nav>
      </header>
      <main>
        <div className="product-details">
          <img src={product.image_url} alt={product.title} />
          <div className="product-info">
            <h1>{product.title}</h1>
            <p>{t('product.description')}: {product.description}</p>
            <p>{t('product.category')}: {product.category}</p>
            <p>{t('product.size')}: {product.size}</p>
            <p>{t('product.price')}: {product.price} ብር</p>
            <p>{t('product.quantity')}: {product.quantity}</p>
            <div className="quantity-selector">
              <label htmlFor="quantity">{t('product.select_quantity')}:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                max={product.quantity}
                onChange={handleQuantityChange}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="action-buttons">
              <button onClick={handleAddToCart} className="btn-add-cart">
                {t('product.add_to_cart')}
              </button>
              <a
                href="https://t.me/seller"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contact"
              >
                {t('product.contact_telegram')}
              </a>
              <a href="tel:+251912345678" className="btn-contact">
                {t('product.contact_phone')}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetail;