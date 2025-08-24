import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Chip,
  CircularProgress
} from '@mui/material';

const Register = () => {
  const { t } = useTranslation();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState('individual');
  const [viesValidation, setViesValidation] = useState({ loading: false, status: null, message: '' });
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

  // Auto-detect user's country and set as default
  React.useEffect(() => {
    const detectUserCountry = async () => {
      try {
        // Try to detect country from browser/IP
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const detectedCountry = data.country_code;
        
        // List of supported countries
        const supportedCountries = [
          'FR', 'BE', 'IT', 'DE', 'ES', 'AT', 'BG', 'HR', 'CY', 'CZ', 
          'DK', 'EE', 'FI', 'GR', 'HU', 'IE', 'LV', 'LT', 'LU', 'MT', 
          'SE', 'PL', 'NL', 'PT', 'RO', 'SK', 'SI', 'UK'
        ];
        
        if (supportedCountries.includes(detectedCountry)) {
          setValue('country', detectedCountry);
        } else {
          setValue('country', 'OTHER');
        }
      } catch (error) {
        // Fallback to France if detection fails
        setValue('country', 'FR');
      }
    };
    
    detectUserCountry();
  }, [setValue]);

  const password = watch('password');
  const vatNumber = watch('vatNumber');

  // VIES validation function
  const validateVIES = async (vatNumber, countryCode) => {
    if (!vatNumber || !countryCode) return;
    
    setViesValidation({ loading: true, status: null, message: '' });
    
    try {
      // Simulate VIES API call - replace with actual VIES service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation logic
      const isValid = Math.random() > 0.3; // 70% success rate for demo
      
      if (isValid) {
        setViesValidation({
          loading: false,
          status: 'valid',
          message: 'Cod TVA valid în sistemul VIES'
        });
      } else {
        setViesValidation({
          loading: false,
          status: 'invalid',
          message: 'Cod TVA nu a fost găsit în VIES. Poți continua înregistrarea - vom verifica ulterior.'
        });
      }
    } catch (error) {
      setViesValidation({
        loading: false,
        status: 'error',
        message: 'Eroare la verificarea VIES. Poți continua înregistrarea - vom verifica ulterior.'
      });
    }
  };

  // Auto-validate VAT when both VAT number and country are available
  React.useEffect(() => {
    const country = watch('country');
    if (accountType === 'company' && vatNumber && country && vatNumber.length > 5) {
      const timeoutId = setTimeout(() => {
        validateVIES(vatNumber, country);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [vatNumber, watch('country'), accountType]);

  const onSubmit = async (data) => {
    try {
      setError('');
      setLoading(true);
      
      const userData = {
        email: data.email,
        accountType,
        name: accountType === 'individual' ? data.fullName : data.companyName,
        phone: data.phone,
        country: data.country,
        ...(accountType === 'company' && {
          company: data.companyName,
          companyAddress: data.companyAddress,
          vatNumber: data.vatNumber,
          fiscalCode: data.fiscalCode,
          contactPerson: data.contactPerson,
          viesStatus: viesValidation.status
        })
      };
      
      await registerUser(userData);
      navigate('/');
    } catch (err) {
      setError('A apărut o eroare la înregistrare. Încercați din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card sx={{ p: 4 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {t('auth.register')}
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Creează un cont nou pentru a accesa catalogul complet PipeSan
          </Typography>

          {/* Account Type Selection */}
          <Card sx={{ p: 3, mb: 4, backgroundColor: 'grey.50' }}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
                Tip de Cont
              </FormLabel>
              <RadioGroup
                row
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <FormControlLabel
                  value="individual"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1"> Persoană Fizică</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Pentru cumpărături personale
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="company"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="subtitle1"> Companie</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Pentru achiziții business cu facturare
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Card>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              
              {/* Individual Fields */}
              {accountType === 'individual' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nume Complet *"
                    {...register('fullName', {
                      required: 'Numele complet este obligatoriu'
                    })}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    required
                  />
                </Grid>
              )}

              {/* Company Fields */}
              {accountType === 'company' && (
                <>
              <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Denumire Companie *"
                      {...register('companyName', {
                        required: 'Denumirea companiei este obligatorie'
                      })}
                      error={!!errors.companyName}
                      helperText={errors.companyName?.message}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Persoană de Contact *"
                      {...register('contactPerson', {
                        required: 'Persoana de contact este obligatorie'
                      })}
                      error={!!errors.contactPerson}
                      helperText={errors.contactPerson?.message}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Adresa Companiei *"
                      multiline
                      rows={2}
                      {...register('companyAddress', {
                        required: 'Adresa companiei este obligatorie'
                      })}
                      error={!!errors.companyAddress}
                      helperText={errors.companyAddress?.message}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cod Fiscal/CUI *"
                      {...register('fiscalCode', {
                        required: 'Codul fiscal este obligatoriu'
                      })}
                      error={!!errors.fiscalCode}
                      helperText={errors.fiscalCode?.message}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <TextField
                        fullWidth
                        label="Cod TVA (opțional)"
                        {...register('vatNumber')}
                        helperText="Dacă ai cod de TVA, îl vom valida în sistemul VIES"
                        InputProps={{
                          endAdornment: viesValidation.loading && (
                            <CircularProgress size={20} />
                          )
                        }}
                      />
                      {viesValidation.status && (
                        <Box sx={{ mt: 1 }}>
                          <Chip
                            size="small"
                            label={viesValidation.message}
                            color={
                              viesValidation.status === 'valid' ? 'success' :
                              viesValidation.status === 'invalid' ? 'warning' : 'error'
                            }
                            sx={{ fontSize: '0.75rem' }}
                          />
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </>
              )}
               <Grid item xs={12}>
               <TextField
                  fullWidth
                  label={`${t('auth.email')} *`}
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
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={`${t('auth.phone')} *`}
                  {...register('phone', {
                    required: 'Numărul de telefon este obligatoriu'
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  required
                />
              </Grid>

             <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Țara de Livrare *</InputLabel>
                  <Select
                    {...register('country', { required: 'Țara de livrare este obligatorie' })}
                    error={!!errors.country}
                    label="Țara de Livrare *"
                    defaultValue=""
                    required
                  >
                    <MenuItem value="FR">🇫🇷 Franța</MenuItem>
                    <MenuItem value="BE">🇪 Belgia</MenuItem>
                    <MenuItem value="IT">🇹 Italia</MenuItem>
                    <MenuItem value="DE"> Germania</MenuItem>
                    <MenuItem value="ES">🇸 Spania</MenuItem>
                    <MenuItem value="AT">🇹 Austria</MenuItem>
                    <MenuItem value="BG"> Bulgaria</MenuItem>
                    <MenuItem value="HR">🇷 Croația</MenuItem>
                    <MenuItem value="CY">🇾 Cipru</MenuItem>
                    <MenuItem value="CZ">🇿 Cehia</MenuItem>
                    <MenuItem value="DK">🇰 Danemarca</MenuItem>
                    <MenuItem value="EE">🇪 Estonia</MenuItem>
                    <MenuItem value="FI"> Finlanda</MenuItem>
                    <MenuItem value="GR">🇷 Grecia</MenuItem>
                    <MenuItem value="HU">🇺 Ungaria</MenuItem>
                    <MenuItem value="IE">🇪 Irlanda</MenuItem>
                    <MenuItem value="LV">🇻 Letonia</MenuItem>
                    <MenuItem value="LT"> Lituania</MenuItem>
                    <MenuItem value="LU">🇺 Luxemburg</MenuItem>
                    <MenuItem value="MT">🇹 Malta</MenuItem>
                    <MenuItem value="SE">🇪 Suedia</MenuItem>
                    <MenuItem value="PL">🇱 Polonia</MenuItem>
                    <MenuItem value="NL">🇱 Olanda</MenuItem>
                    <MenuItem value="PT">🇹 Portugalia</MenuItem>
                    <MenuItem value="RO">🇴 România</MenuItem>
                    <MenuItem value="SK"> Slovacia</MenuItem>
                    <MenuItem value="SI"> Slovenia</MenuItem>
                    <MenuItem value="UK">🇧 Marea Britanie</MenuItem>
                    <MenuItem value="OTHER">🌍 Altă țară</MenuItem>
                  </Select>
                  {errors.country && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                      {errors.country.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={`${t('auth.password')} *`}
                  type="password"
                  {...register('password', {
                    required: 'Parola este obligatorie',
                    minLength: {
                      value: 6,
                      message: 'Parola trebuie să aibă cel puțin 6 caractere'
                    }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={`${t('auth.confirm_password')} *`}
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Confirmarea parolei este obligatorie',
                    validate: value =>
                      value === password || 'Parolele nu se potrivesc'
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  required
                />
              </Grid>
              
              {/* Terms and Conditions */}
              <Grid item xs={12}>
                <Alert severity="info">
                  <Typography variant="body2">
                    <strong>Informații importante:</strong><br />
                    • Pentru companiile cu cod TVA, verificăm automat în sistemul VIES<br />
                    • Dacă verificarea VIES eșuează, poți continua înregistrarea<br />
                    • Vom verifica manual datele companiei în termen de 24h<br />
                    • Toate datele sunt protejate conform GDPR
                  </Typography>
                </Alert>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 4, mb: 2 }}
            >
              {loading ? 'Se înregistrează...' : t('auth.register')}
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" align="center">
              {t('auth.have_account')}{' '}
              <Button
                component={Link}
                to="/login"
                variant="text"
              >
                {t('auth.login')}
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;