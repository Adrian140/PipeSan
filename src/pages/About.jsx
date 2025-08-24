import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import {
  Engineering,
  Verified,
  Groups,
  TrendingUp
} from '@mui/icons-material';

const About = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Engineering sx={{ fontSize: 40, color: 'primary.main' }} />,
      number: "2+",
      label: "Ani de Experiență"
    },
    {
      icon: <Verified sx={{ fontSize: 40, color: 'primary.main' }} />,
      number: "50+",
      label: "Produse Premium"
    },
    {
      icon: <Groups sx={{ fontSize: 40, color: 'primary.main' }} />,
      number: "500+",
      label: "Clienți Mulțumiți"
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      number: "9",
      label: "Țări Europene"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" gutterBottom align="center">
        {t('about.title')}
      </Typography>
      
      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
            Povestea Noastră
          </Typography>
          <Typography variant="body1" paragraph>
            {t('about.content')}
          </Typography>
          <Typography variant="body1" paragraph>
            Fondată în 2022, PipeSan a devenit rapid un nume de referință în domeniul 
            produselor sanitare din Europa. Începând ca o afacere de echipă dedicată, 
            am crescut constant prin dedicarea noastră față de calitate și servicii 
            excepționale pentru clienți.
          </Typography>
          <Typography variant="body1" paragraph>
            Astăzi, oferim o gamă completă de produse sanitare premium, de la racorduri și 
            robinete până la accesorii specializate, toate selectate cu atenție pentru 
            a îndeplini cele mai înalte standarde de calitate și durabilitate. Produsele 
            noastre sunt disponibile în toată Europa prin platformele Amazon locale.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
            alt="PipeSan Workshop"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: 3
            }}
          />
        </Grid>
      </Grid>

      {/* Stats Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          PipeSan în Cifre
        </Typography>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Mission & Vision */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%', backgroundColor: 'primary.main', color: 'white' }}>
            <Typography variant="h5" gutterBottom>
              Misiunea Noastră
            </Typography>
            <Typography variant="body1">
              Să oferim produse sanitare de cea mai înaltă calitate, 
              sprijinind profesioniștii și particularii în realizarea 
              instalațiilor sanitare durabile și eficiente. Ne angajăm 
              să fim partenerul de încredere pentru toate nevoile dvs. sanitare.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%', backgroundColor: 'secondary.main', color: 'white' }}>
            <Typography variant="h5" gutterBottom>
              Viziunea Noastră
            </Typography>
            <Typography variant="body1">
              Viziunea noastră este să fim partenerul de încredere al clienților 
              din întreaga Europă, prin produse sanitare inovatoare și servicii de calitate. 
              Aspirăm să redefinim standardele industriei și să extindem constant 
              granițele excelenței.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
