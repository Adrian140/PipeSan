import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Alert
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  AccessTime
} from '@mui/icons-material';

const Contact = () => {
  const { t } = useTranslation();
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: t('contact_info.email_title'),
      content: "contact@pipesan.eu",
      link: "mailto:contact@pipesan.eu"
    },
    {
      icon: <Phone sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: t('contact_info.phone_title'),
      content: null, // Will be handled separately
      phones: [
        { country: "România", number: "+40 722 140 444", link: "tel:+40722140444" },
        { country: "Franța", number: "+33 6 75 11 62 18", link: "tel:+33675116218" }
      ]
    },
    {
      icon: <LocationOn sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: t('contact_info.address_title'),
      content: t('contact_info.address_text'),
      link: null
    },
    {
      icon: <AccessTime sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: t('contact_info.schedule_title'),
      content: t('contact_info.schedule_text'),
      link: null
    }
  ];

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus(null);
      
      // Submit to Formspree
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xandwogl';
      
      console.log('Submitting to Formspree:', formspreeEndpoint);
      console.log('Form data:', data);
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || 'Nu a fost furnizat',
          subject: data.subject,
          message: data.message,
          _replyto: data.email,
          _subject: `[PipeSan Contact] ${data.subject} - de la ${data.name}`,
          _format: 'plain'
        }),
      });

      console.log('Formspree response status:', response.status);
      console.log('Formspree response:', response);
      
      if (response.ok) {
        console.log('Form submitted successfully');
        setSubmitStatus('success');
        reset();
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        const errorData = await response.text();
        console.error('Formspree error response:', errorData);
        throw new Error('Eroare la trimiterea formularului');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h2" gutterBottom align="center">
        {t('contact.title')}
      </Typography>
      <Typography variant="h6" align="center" sx={{ mb: 6, color: 'text.secondary' }}>
        {t('contact_info.contact_subtitle')}
      </Typography>

      <Grid container spacing={6}>
        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            {t('contact_info.contact_information')}
          </Typography>
          
          <Grid container spacing={3}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {info.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {info.title}
                    </Typography>
                    {info.phones ? (
                      <Box>
                        {info.phones.map((phone, phoneIndex) => (
                          <Typography
                            key={phoneIndex}
                            component="a"
                            href={phone.link}
                            variant="body1"
                            sx={{ 
                              color: 'text.primary',
                              textDecoration: 'none',
                              display: 'block',
                              mb: 0.5,
                              '&:hover': { color: 'primary.main' }
                            }}
                          >
                            {phone.country}: {phone.number}
                          </Typography>
                        ))}
                      </Box>
                    ) : info.link ? (
                      <Typography
                        component="a"
                        href={info.link}
                        variant="body1"
                        sx={{ 
                          color: 'text.primary',
                          textDecoration: 'none',
                          '&:hover': { color: 'primary.main' }
                        }}
                      >
                        {info.content}
                      </Typography>
                    ) : (
                      <Typography variant="body1" color="text.secondary">
                        {info.content}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Map placeholder */}
          <Box sx={{ mt: 4 }}>
            <Card>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92160.68477812186!2d23.72436!3d44.3302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b5c1b8b6b6b6b7%3A0x5c5c5c5c5c5c5c5c!2sCraiova%2C%20Romania!5e0!3m2!1sen!2sro!4v1234567890123"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locația PipeSan în Craiova, România"
              />
            </Card>
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Trimite-ne un Mesaj
            </Typography>
            
            {submitStatus === 'success' && (
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="body1">
                  <strong>✅ {t('contact_info.message_success')}</strong><br />
                  {t('contact_info.message_success_detail')}
                </Typography>
              </Alert>
            )}
            
            {submitStatus === 'error' && (
              <Alert severity="error" sx={{ mb: 3 }}>
                <Typography variant="body1">
                  <strong>❌ {t('contact_info.message_error')}</strong><br />
                  {t('contact_info.message_error_detail')}
                </Typography>
              </Alert>
            )}

            {isSubmitting && (
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body1">
                  <strong>📤 {t('contact_info.message_sending')}</strong><br />
                  {t('contact_info.message_sending_detail')}
                </Typography>
              </Alert>
            )}
              {t('contact_info.send_message')}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('contact.name')}
                    {...register('name', { required: 'Numele este obligatoriu' })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('contact.email')}
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
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('contact.phone')}
                    {...register('phone')}
                    error={!!errors.phone}
                    helperText="Opțional - pentru a vă putea contacta telefonic"
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subiect"
                    {...register('subject', { required: 'Subiectul este obligatoriu' })}
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t('contact.message')}
                    multiline
                    rows={4}
                    {...register('message', { required: 'Mesajul este obligatoriu' })}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Se trimite...' : t('contact.send')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;