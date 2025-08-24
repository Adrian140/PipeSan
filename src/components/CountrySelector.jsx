import React, { useState } from 'react';
import { useCountry } from '../contexts/CountryContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider
} from '@mui/material';
import {
  Public,
  KeyboardArrowDown
} from '@mui/icons-material';

const CountrySelector = () => {
  const { selectedCountry, countries, changeCountry, getCurrentCountry } = useCountry();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCountrySelect = (countryCode) => {
    changeCountry(countryCode);
    handleClose();
  };

  const currentCountry = getCurrentCountry();

  return (
    <Box>
      <Button
        onClick={handleClick}
        startIcon={<Public />}
        endIcon={<KeyboardArrowDown />}
        sx={{ 
          color: 'text.primary',
          textTransform: 'none',
          minWidth: 120
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span style={{ fontSize: '1.2em' }}>{currentCountry.flag}</span>
          <Typography variant="body2">
            {currentCountry.code}
          </Typography>
        </Box>
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { minWidth: 200 }
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
          {user ? 'Țara ta de livrare' : 'Selectează țara pentru Amazon'}
        </Typography>
        <Divider />
        
        {countries.map((country) => (
          <MenuItem
            key={country.code}
            onClick={() => !user && handleCountrySelect(country.code)}
            selected={country.code === selectedCountry}
            disabled={user ? true : false}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <span style={{ fontSize: '1.2em' }}>{country.flag}</span>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2">
                  {country.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {country.amazon}
                </Typography>
              </Box>
              {country.primary && (
                <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  Principal
                </Typography>
              )}
              {user && country.code === selectedCountry && (
                <Typography variant="caption" color="success.main" sx={{ fontWeight: 'bold' }}>
                  {country.code === 'OTHER' ? 'Zona ta' : 'Țara ta'}
                </Typography>
              )}
            </Box>
          </MenuItem>
        ))}
        
        {user && (
          <>
            <Divider />
            <Typography variant="caption" sx={{ px: 2, py: 1, color: 'text.secondary', display: 'block' }}>
              Țara de livrare se poate modifica din profil
            </Typography>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default CountrySelector;
