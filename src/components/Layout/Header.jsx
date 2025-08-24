import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import CountrySelector from '../CountrySelector';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Container,
  Select,
  FormControl
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Language,
  AdminPanelSettings
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              height: 40
            }}
          >
            <Box
              component="img"
              src="https://i.postimg.cc/HJGBDzCb/logo.png"
              alt="PipeSan Logo"
              sx={{
                height: '100%',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button component={Link} to="/" color="inherit">
              {t('nav.home')}
            </Button>
            <Button component={Link} to="/products" color="inherit">
              {t('nav.products')}
            </Button>
            <Button component={Link} to="/about" color="inherit">
              {t('nav.about')}
            </Button>
            <Button component={Link} to="/contact" color="inherit">
              {t('nav.contact')}
            </Button>

            <FormControl size="small" sx={{ minWidth: 60 }}>
              <Select
                value={i18n.language}
                onChange={handleLanguageChange}
                displayEmpty
                sx={{ color: 'text.primary' }}
              >
                <MenuItem value="ro">��🇴 RO</MenuItem>
                <MenuItem value="en">��🇧 EN</MenuItem>
                <MenuItem value="fr">��🇷 FR</MenuItem>
                <MenuItem value="de">��🇪 DE</MenuItem>
                <MenuItem value="es">��🇸 ES</MenuItem>
                <MenuItem value="it">��🇹 IT</MenuItem>
                <MenuItem value="nl">��🇱 NL</MenuItem>
                <MenuItem value="pl">��🇱 PL</MenuItem>
                <MenuItem value="pt">��🇹 PT</MenuItem>
                <MenuItem value="sv">��🇪 SV</MenuItem>
                <MenuItem value="da">��🇰 DA</MenuItem>
                <MenuItem value="fi">��🇮 FI</MenuItem>
                <MenuItem value="el">��🇷 EL</MenuItem>
                <MenuItem value="hu">��🇺 HU</MenuItem>
                <MenuItem value="cs">��🇿 CS</MenuItem>
                <MenuItem value="sk">��🇰 SK</MenuItem>
                <MenuItem value="sl">��🇮 SI</MenuItem>
                <MenuItem value="bg">��🇬 BG</MenuItem>
                <MenuItem value="hr">��🇷 HR</MenuItem>
                <MenuItem value="et">��🇪 ET</MenuItem>
                <MenuItem value="lv">��🇻 LV</MenuItem>
                <MenuItem value="lt">��🇹 LT</MenuItem>
                <MenuItem value="mt">��🇹 MT</MenuItem>
              </Select>
            </FormControl>

            <CountrySelector />

            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={getTotalItems()} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {user ? (
              <>
                {isAdmin && (
                  <IconButton
                    component={Link}
                    to="/admin"
                    color="inherit"
                    title={t('nav.admin')}
                    sx={{ 
                      backgroundColor: 'primary.main', 
                      color: 'white',
                      '&:hover': { backgroundColor: 'primary.dark' }
                    }}
                  >
                    <AdminPanelSettings />
                  </IconButton>
                )}
                <IconButton onClick={handleMenuOpen} color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>
                    {user.name || user.email}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button component={Link} to="/login" variant="outlined" size="small">
                  {t('nav.login')}
                </Button>
                <Button component={Link} to="/register" variant="contained" size="small">
                  {t('nav.register')}
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
