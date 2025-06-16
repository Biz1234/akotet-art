
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-wood-brown text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">አኮቴት አርት</Link>
      <div className="space-x-4">
        <Link to="/">{t('home')}</Link>
        <Link to="/browse">{t('browse')}</Link>
        <Link to="/login">{t('login')}</Link>
        <Link to="/signup">{t('signup')}</Link>
        <button onClick={() => changeLanguage('am')}>አማርኛ</button>
        <button onClick={() => changeLanguage('en')}>English</button>
      </div>
    </nav>
  );
}

export default Navbar;