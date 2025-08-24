import React from 'react';
import CategoryManagement from './pages/Admin/CategoryManagement';
import OrderManagement from './pages/Admin/OrderManagement';
import UserManagement from './pages/Admin/UserManagement';
import './i18n';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProductManagement from './pages/Admin/ProductManagement';
import AuthProvider from './contexts/AuthContext';
import CountryProvider from './contexts/CountryContext';
import CartProvider from './contexts/CartContext';
import Layout from './components/Layout/Layout';
function App() {
  // Error boundary for production debugging
  React.useEffect(() => {
    const handleError = (error) => {
      console.error('Application error:', error);
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CountryProvider>
          <CartProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<ProductManagement />} />
                  <Route path="/admin/categories" element={<CategoryManagement />} />
                  <Route path="/admin/orders" element={<OrderManagement />} />
                  <Route path="/admin/users" element={<UserManagement />} />
                </Routes>
              </Layout>
            </Router>
          </CartProvider>
        </CountryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;