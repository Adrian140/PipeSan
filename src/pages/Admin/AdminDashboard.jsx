import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Alert
} from '@mui/material';
import {
  Inventory,
  Category,
  ShoppingCart,
  People,
  TrendingUp,
  AttachMoney,
  CheckCircle
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: "Total Produse",
      value: "52",
      icon: <Inventory sx={{ fontSize: 40, color: 'primary.main' }} />,
      change: "+8 această lună"
    },
    {
      title: "Comenzi Active",
      value: "15",
      icon: <ShoppingCart sx={{ fontSize: 40, color: 'success.main' }} />,
      change: "+3 astăzi"
    },
    {
      title: "Clienți Înregistrați",
      value: "287",
      icon: <People sx={{ fontSize: 40, color: 'info.main' }} />,
      change: "+23 această săptămână"
    },
    {
      title: "Vânzări Luna Aceasta",
      value: "12,450 EUR",
      icon: <AttachMoney sx={{ fontSize: 40, color: 'warning.main' }} />,
      change: "+18% față de luna trecută"
    }
  ];

  const quickActions = [
    {
      title: "Adaugă Produs Nou",
      description: "Adaugă un produs nou în catalog",
      icon: <Inventory />,
      link: "/admin/products",
      color: "primary"
    },
    {
      title: "Gestionează Categorii",
      description: "Organizează categoriile de produse",
      icon: <Category />,
      link: "/admin/categories", 
      color: "secondary"
    },
    {
      title: "Vezi Comenzile",
      description: "Procesează comenzile clienților",
      icon: <ShoppingCart />,
      link: "/admin/orders",
      color: "success"
    },
    {
      title: "Gestionează Utilizatori",
      description: "Administrează conturile clienților",
      icon: <People />,
      link: "/admin/users",
      color: "info"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        {t('admin.dashboard')}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Bun venit în panoul de administrare PipeSan
      </Typography>
      
      <Alert severity="success" sx={{ mb: 4 }}>
        <Typography variant="body1">
          <strong>🎉 Bun venit, Administrator PipeSan!</strong><br />
          Ai acces complet la panoul de administrare. Poți gestiona produse, categorii, comenzi și utilizatori pentru platforma PipeSan.eu.
        </Typography>
      </Alert>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="success.main">
                  {stat.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h4" gutterBottom>
        Acțiuni Rapide
      </Typography>
      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ mb: 2, color: `${action.color}.main` }}>
                  {React.cloneElement(action.icon, { sx: { fontSize: 48 } })}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {action.description}
                </Typography>
                <Button
                  component={Link}
                  to={action.link}
                  variant="contained"
                  color={action.color}
                  fullWidth
                >
                  Accesează
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Activitate Recentă
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Aici vor fi afișate ultimele activități din sistem:
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Comandă nouă #1234 - 15:30
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Produs "Racord Premium" actualizat - 14:20
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Client nou înregistrat: john@example.com - 13:45
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Comandă #1233 finalizată - 12:30
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
