import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: 'grey.900', color: 'white', mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                PipeSan
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'grey.300' }}>
                {t('about.content')}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                {t('contact.title')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">
                  contact@pipesan.eu
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 1, fontSize: 20 }} />
                <Box>
                  <Typography 
                    component="a" 
                    href="tel:+40722140444"
                    variant="body2"
                    sx={{ 
                      color: 'inherit', 
                      textDecoration: 'none',
                      display: 'block',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    România: +40 722 140 444
                  </Typography>
                  <Typography 
                    component="a" 
                    href="tel:+33675116218"
                    variant="body2"
                    sx={{ 
                      color: 'inherit', 
                      textDecoration: 'none',
                      display: 'block',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    Franța: +33 6 75 11 62 18
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">
                  Craiova, România
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Link-uri Utile
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="/products" color="inherit" underline="hover">
                  {t('nav.products')}
                </Link>
                <Link href="/about" color="inherit" underline="hover">
                  {t('nav.about')}
                </Link>
                <Link href="/contact" color="inherit" underline="hover">
                  {t('nav.contact')}
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      
      <Divider sx={{ borderColor: 'grey.700' }} />
      
      <Box sx={{ py: 2, backgroundColor: 'grey.800' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ color: 'grey.400', fontSize: '0.875rem' }}
          >
            AI vibe coded development by{' '}
            <Link 
              href="https://biela.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ color: 'grey.300', textDecoration: 'none' }}
            >
              Biela.dev
            </Link>
            , powered by{' '}
            <Link 
              href="https://teachmecode.ae/" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ color: 'grey.300', textDecoration: 'none' }}
            >
              TeachMeCode® Institute
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
