import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  Alert,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Launch,
  Info
} from '@mui/icons-material';

const AmazonLinksManager = ({ amazonLinks = {}, onLinksChange }) => {
  const [links, setLinks] = useState(amazonLinks);
  const [hiddenLinks, setHiddenLinks] = useState(amazonLinks.hidden || {});

  const countries = [
    { code: 'FR', name: 'Franța', flag: '🇫��', amazon: 'amazon.fr' },
    { code: 'BE', name: 'Belgia', flag: '🇧🇪', amazon: 'amazon.com.be' },
    { code: 'IT', name: 'Italia', flag: '🇮🇹', amazon: 'amazon.it' },
    { code: 'DE', name: 'Germania', flag: '🇩🇪', amazon: 'amazon.de' },
    { code: 'ES', name: 'Spania', flag: '🇪��', amazon: 'amazon.es' },
    { code: 'SE', name: 'Suedia', flag: '🇸🇪', amazon: 'amazon.se' },
    { code: 'PL', name: 'Polonia', flag: '🇵🇱', amazon: 'amazon.pl' },
    { code: 'NL', name: 'Olanda', flag: '🇳🇱', amazon: 'amazon.nl' },
    { code: 'UK', name: 'Marea Britanie', flag: '🇬🇧', amazon: 'amazon.co.uk' }
  ];

  const handleLinkChange = (countryCode, value) => {
    const updatedLinks = {
      ...links,
      [countryCode]: value
    };
    setLinks(updatedLinks);
    
    // Notify parent with complete data including hidden status
    onLinksChange({
      ...updatedLinks,
      hidden: hiddenLinks
    });
  };

  const handleVisibilityToggle = (countryCode) => {
    const updatedHidden = {
      ...hiddenLinks,
      [countryCode]: !hiddenLinks[countryCode]
    };
    setHiddenLinks(updatedHidden);
    
    // Notify parent with complete data
    onLinksChange({
      ...links,
      hidden: updatedHidden
    });
  };

  const validateAmazonLink = (link, expectedDomain) => {
    if (!link) return null;
    
    try {
      const url = new URL(link);
      if (url.hostname.includes(expectedDomain)) {
        return 'valid';
      } else {
        return 'warning';
      }
    } catch {
      return 'error';
    }
  };

  const getValidationMessage = (status, expectedDomain) => {
    switch (status) {
      case 'valid':
        return `Link valid pentru ${expectedDomain}`;
      case 'warning':
        return `Link-ul nu pare să fie pentru ${expectedDomain}`;
      case 'error':
        return 'Link invalid - verificați formatul URL';
      default:
        return null;
    }
  };

  const getValidationColor = (status) => {
    switch (status) {
      case 'valid': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        Link-uri Amazon pentru fiecare țară
        <Tooltip title="Puteți ascunde temporar link-urile fără a le șterge">
          <Info color="action" fontSize="small" />
        </Tooltip>
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Funcționalități:</strong><br />
          • Adăugați link-urile complete Amazon pentru fiecare țară<br />
          • Folosiți butonul de vizibilitate pentru a ascunde temporar link-urile<br />
          • Link-urile ascunse nu vor fi afișate clienților, dar rămân salvate<br />
          • Pentru "Altă țară" se va folosi automat link-ul din Germania
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {countries.map((country) => {
          const currentLink = links[country.code] || '';
          const isHidden = hiddenLinks[country.code] || false;
          const validationStatus = validateAmazonLink(currentLink, country.amazon);
          
          return (
            <Grid item xs={12} key={country.code}>
              <Card sx={{ 
                opacity: isHidden ? 0.6 : 1,
                border: isHidden ? '2px dashed' : '1px solid',
                borderColor: isHidden ? 'warning.main' : 'divider'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">
                        {country.flag} {country.name}
                      </Typography>
                      <Chip 
                        label={country.amazon} 
                        size="small" 
                        variant="outlined"
                      />
                      {validationStatus && (
                        <Chip
                          label={getValidationMessage(validationStatus, country.amazon)}
                          size="small"
                          color={getValidationColor(validationStatus)}
                        />
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {currentLink && (
                        <IconButton
                          size="small"
                          href={currentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="primary"
                        >
                          <Launch />
                        </IconButton>
                      )}
                      
                      <FormControlLabel
                        control={
                          <Switch
                            checked={!isHidden}
                            onChange={() => handleVisibilityToggle(country.code)}
                            icon={<VisibilityOff />}
                            checkedIcon={<Visibility />}
                          />
                        }
                        label={isHidden ? 'Ascuns' : 'Vizibil'}
                      />
                    </Box>
                  </Box>
                  
                  <TextField
                    fullWidth
                    label={`Link Amazon ${country.name}`}
                    value={currentLink}
                    onChange={(e) => handleLinkChange(country.code, e.target.value)}
                    placeholder={`https://${country.amazon}/dp/B08XYZ123`}
                    helperText={`Link complet pentru ${country.amazon}`}
                    disabled={isHidden}
                    error={validationStatus === 'error'}
                  />
                  
                  {isHidden && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Link ascuns:</strong> Acest link nu va fi afișat clienților, dar rămâne salvat în sistem.
                      </Typography>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AmazonLinksManager;
