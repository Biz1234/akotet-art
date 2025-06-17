
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css';

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(t('auth.login_error'));
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
        <h1>{t('auth.login_title')}</h1>
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
          <button type="submit">{t('nav.login')}</button>
        </form>
        <p>
          {t('auth.no_account')} <Link to="/signup">{t('nav.signup')}</Link>
        </p>
      </main>
    </div>
  );
}

export default Login;