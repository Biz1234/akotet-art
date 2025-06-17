import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './styles/global.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/browse" element={<UserDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<UserDashboard />} />}
        />
      </Routes>
    </div>
  );
}

export default App;