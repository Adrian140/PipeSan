import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCountry } from '../contexts/CountryContext';
import { db } from '../lib/supabase.jsx';
import { useForm } from 'react-hook-form';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Box,
  Divider,
  Chip
} from '@mui/material';
import {
  Person,
  Business,
  LocationOn,
  Save
} from '@mui/icons-material';

const Profile = () => {
  const { user } = useAuth();
  const { countries, selectedCountry, changeCountry } = useCountry();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: user?.country || selectedCountry,
      company_name: user?.company_name || '',
      company_address: user?.company_address || '',
      contact_person: user?.contact_person || '',
      fiscal_code: user?.fiscal_code || '',
      vat_number: user?.vat_number || ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setAlert(null);
      
      // Update user profile
      await db.updateUser(user.id, data);
      
      // Update country if changed
      if (data.country !== selectedCountry) {
        changeCountry(data.country);
      }
      
      setAlert({ type: 'success', message: 'Profilul a fost actualizat cu succes!' });
      setTimeout(() => setAlert(null), 5000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setAlert({ type: 'error', message: 'Eroare la actualizarea profilului. Încercați din nou.' });
      setTimeout(() => setAlert(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const currentCountry = countries.find(c => c.code === selectedCountry);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Profilul Meu
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Gestionează informațiile contului și preferințele de livrare
      </Typography>

      {alert && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Account Information */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {user?.account_type === 'company' ? <Business /> : <Person />}
                Informații Cont
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nume Complet / Denumire Companie"
                      {...register('name', { required: 'Numele este obligatoriu' })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      {...register('email', { 
                        required: 'Email-ul este obligatoriu',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Email invalid'
                        }
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Telefon"
                      {...register('phone')}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Țara de Livrare</InputLabel>
                      <Select
                        {...register('country', { required: 'Țara este obligatorie' })}
                        error={!!errors.country}
                        label="Țara de Livrare"
                      >
                        {countries.map((country) => (
                          <MenuItem key={country.code} value={country.code}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <img src={country.flag} alt={country.code} width="20" height="15" />
                              <span>{country.name}</span>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Company Fields */}
                  {user?.account_type === 'company' && (
                    <>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }}>
                          <Chip label="Informații Companie" />
                        </Divider>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Persoană de Contact"
                          {...register('contact_person')}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Adresa Companiei"
                          multiline
                          rows={2}
                          {...register('company_address')}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Cod Fiscal/CUI"
                          {...register('fiscal_code')}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Cod TVA"
                          {...register('vat_number')}
                          helperText="Opțional"
                        />
                      </Grid>
                    </>
                  )}
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Save />}
                      disabled={loading}
                      sx={{ mt: 2 }}
                    >
                      {loading ? 'Se salvează...' : 'Salvează Modificările'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Current Settings Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn />
                Setări Curente
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Țara de Livrare
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <img src={currentCountry?.flag} alt={currentCountry?.code} width="24" height="18" />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {currentCountry?.name}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Amazon: {currentCountry?.amazon}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tip Cont
                </Typography>
                <Chip 
                  icon={user?.account_type === 'company' ? <Business /> : <Person />}
                  label={user?.account_type === 'company' ? 'Companie' : 'Persoană Fizică'}
                  color="primary"
                  sx={{ mt: 1 }}
                />
              </Box>
              
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Notă:</strong> Schimbarea țării va actualiza automat link-urile Amazon afișate în catalog.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
