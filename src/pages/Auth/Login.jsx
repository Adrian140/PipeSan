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
  Divider
} from '@mui/material';

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setError('');
      setLoading(true);
      
      console.log('Login attempt:', data.email);
      
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Email sau parolă incorectă. Verificați datele introduse și încercați din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card sx={{ p: 4 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {t('auth.login')}
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Conectează-te la contul tău PipeSan
          </Typography>
          
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>💡 Informații de conectare:</strong><br />
                • Folosește email-ul și parola cu care te-ai înregistrat<br />
                • Dacă ai uitat parola, folosește opțiunea "Parolă uitată"<br />
                • Pentru probleme tehnice, contactează support la contact@pipesan.eu
              </Typography>
            </Alert>
            
         {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label={t('auth.email')}
              type="email"
              margin="normal"
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

            <TextField
              fullWidth
              label={t('auth.password')}
              type="password"
              margin="normal"
              {...register('password', {
                required: 'Parola este obligatorie',
                minLength: {
                  value: 6,
                  message: 'Parola trebuie să aibă cel puțin 6 caractere'
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Se conectează...' : t('auth.login')}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                component={Link}
                to="/forgot-password"
                variant="text"
                size="small"
              >
                {t('auth.forgot_password')}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" align="center">
              {t('auth.no_account')}{' '}
              <Button
                component={Link}
                to="/register"
                variant="text"
              >
                {t('auth.register')}
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
