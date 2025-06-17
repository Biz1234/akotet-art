import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css';

function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError(t('auth.signup_error'));
    }
  };

  return (
    <div className="auth-container">
      <header>
        <div className="logo">አኮቴት አርት</div>
        <nav>
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/browse">{t('nav.browse')}</Link>
        </nav>
      </header>
      <main>
        <h1>{t('auth.signup_title')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t('auth.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('auth.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">{t('nav.signup')}</button>
        </form>
        <p>
          {t('auth.has_account')} <Link to="/login">{t('nav.login')}</Link>
        </p>
      </main>
    </div>
  );
}

export default Signup;