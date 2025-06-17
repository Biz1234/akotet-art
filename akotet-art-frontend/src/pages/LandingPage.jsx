import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/landing.css';

function LandingPage() {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setProducts(data.slice(0, 3));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="landing-container">
      <header>
        <div className="logo">አኮቴት አርት</div>
        <nav>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/browse">{t('nav.browse')}</Link>
          <Link to="/login">{t('nav.login')}</Link>
          <Link to="/signup">{t('nav.signup')}</Link>
          <div className="language-switcher">
            <button onClick={() => changeLanguage('am')}>አማርኛ</button>
            <button onClick={() => changeLanguage('en')}>English</button>
          </div>
        </nav>
      </header>
      <main>
        <h1>{t('landing.title')}</h1>
        <p>{t('landing.subtitle')}</p>
        <section className="featured-products">
          <h2>{t('landing.featured')}</h2>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image_url} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>
                    {t('product.price')}: {product.price} ብር
                  </p>
                  <Link to={`/product/${product.id}`} className="btn-details">
                    {t('product.details')}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
        <Link to="/browse" className="cta-button">
          {t('landing.cta')}
        </Link>
      </main>
    </div>
  );
}

export default LandingPage;