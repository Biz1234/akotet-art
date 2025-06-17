import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';

function UserDashboard() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');

  const categories = ['Portrait', 'Names', 'Animals', 'Culture'];
  const sizes = ['Small', 'Medium', 'Large'];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? product.category === category : true) &&
      (size ? product.size.toLowerCase().includes(size.toLowerCase()) : true)
    );
  });

  const resetFilters = () => {
    setSearch('');
    setCategory('');
    setSize('');
  };

  return (
    <div className="dashboard-container">
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
        <h1>{t('dashboard.title')}</h1>
        <div className="filters">
          <input
            type="text"
            placeholder={t('dashboard.search_placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">{t('dashboard.all_categories')}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">{t('dashboard.all_sizes')}</option>
            {sizes.map((sz) => (
              <option key={sz} value={sz}>
                {sz}
              </option>
            ))}
          </select>
          <button onClick={resetFilters}>{t('dashboard.reset_filters')}</button>
        </div>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <p>{t('dashboard.no_products')}</p>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image_url} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>{t('product.category')}: {product.category}</p>
                  <p>{t('product.size')}: {product.size}</p>
                  <p>{t('product.price')}: {product.price} ብር</p>
                  <Link to={`/product/${product.id}`} className="btn-details">
                    {t('product.details')}
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default UserDashboard;