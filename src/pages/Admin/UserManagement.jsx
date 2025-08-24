import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Edit,
  Delete,
  Block,
  CheckCircle,
  Person,
  Business,
  AdminPanelSettings,
  Email,
  Phone
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';

const UserManagement = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [alert, setAlert] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Mock users data
  const mockUsers = [
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '+33 6 12 34 56 78',
      company: 'Plomberie Dupont',
      role: 'customer',
      status: 'active',
      registrationDate: '2024-01-10',
      lastLogin: '2024-01-15',
      totalOrders: 5,
      totalSpent: 1250.75
    },
    {
      id: 2,
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      phone: '+33 6 87 65 43 21',
      company: '',
      role: 'customer',
      status: 'active',
      registrationDate: '2024-01-08',
      lastLogin: '2024-01-14',
      totalOrders: 3,
      totalSpent: 456.50
    },
    {
      id: 3,
      name: 'Administrator PipeSan',
      email: 'contact@pipesan.eu',
      phone: '+40 722 140 444',
      company: 'PipeSan',
      role: 'admin',
      status: 'active',
      registrationDate: '2022-01-01',
      lastLogin: '2024-01-15',
      totalOrders: 0,
      totalSpent: 0
    },
    {
      id: 4,
      name: 'Pierre Dubois',
      email: 'pierre.dubois@email.com',
      phone: '+33 6 55 44 33 22',
      company: 'Rénovation Pro',
      role: 'customer',
      status: 'blocked',
      registrationDate: '2024-01-05',
      lastLogin: '2024-01-12',
      totalOrders: 1,
      totalSpent: 89.99
    }
  ];

  const roleOptions = [
    { value: 'customer', label: 'Client', icon: <Person /> },
    { value: 'admin', label: 'Administrator', icon: <AdminPanelSettings /> }
  ];

  const statusOptions = [
    { value: 'active', label: 'Activ', color: 'success' },
    { value: 'blocked', label: 'Blocat', color: 'error' },
    { value: 'pending', label: 'În Așteptare', color: 'warning' }
  ];

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const getRoleConfig = (role) => {
    return roleOptions.find(option => option.value === role) || roleOptions[0];
  };

  const getStatusConfig = (status) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('phone', user.phone);
    setValue('company', user.company);
    setValue('role', user.role);
    setValue('status', user.status);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    reset();
  };

  const onSubmit = (data) => {
    try {
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...data }
          : user
      ));
      setAlert({ type: 'success', message: 'Utilizatorul a fost actualizat cu succes!' });
      handleCloseDialog();
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      setAlert({ type: 'error', message: 'A apărut o eroare. Încercați din nou.' });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const handleDelete = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setDeleteConfirm(null);
    setAlert({ type: 'success', message: 'Utilizatorul a fost șters cu succes!' });
    setTimeout(() => setAlert(null), 3000);
  };

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
        : user
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ro-RO');
  };

  // Statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const adminUsers = users.filter(user => user.role === 'admin').length;
  const customerUsers = users.filter(user => user.role === 'customer').length;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Gestionare Utilizatori
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Administrează conturile și permisiunile utilizatorilor
      </Typography>

      {alert && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      {/* User Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                {totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Utilizatori
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                {activeUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Utilizatori Activi
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main" sx={{ fontWeight: 'bold' }}>
                {customerUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Clienți
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>
                {adminUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Administratori
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Users Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Utilizator</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Înregistrare</TableCell>
              <TableCell>Comenzi</TableCell>
              <TableCell>Total Cheltuit</TableCell>
              <TableCell>Acțiuni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const roleConfig = getRoleConfig(user.role);
              const statusConfig = getStatusConfig(user.status);
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 2 }}>
                        {user.role === 'admin' ? <AdminPanelSettings color="primary" /> : <Person />}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {user.name}
                        </Typography>
                        {user.company && (
                          <Typography variant="body2" color="text.secondary">
                            <Business sx={{ fontSize: 14, mr: 0.5 }} />
                            {user.company}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      <Email sx={{ fontSize: 14, mr: 0.5 }} />
                      {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Phone sx={{ fontSize: 14, mr: 0.5 }} />
                      {user.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      icon={roleConfig.icon}
                      label={roleConfig.label}
                      color={user.role === 'admin' ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={statusConfig.label}
                      color={statusConfig.color}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(user.registrationDate)}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {user.totalOrders}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {formatPrice(user.totalSpent)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(user)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => toggleUserStatus(user.id)}
                        color={user.status === 'active' ? 'error' : 'success'}
                      >
                        {user.status === 'active' ? <Block /> : <CheckCircle />}
                      </IconButton>
                      {user.role !== 'admin' && (
                        <IconButton
                          size="small"
                          onClick={() => setDeleteConfirm(user.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Editează Utilizator
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nume Complet"
                  {...register('name', { required: 'Numele este obligatoriu' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
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
                <TextField
                  fullWidth
                  label="Companie"
                  {...register('company')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    {...register('role', { required: 'Rolul este obligatoriu' })}
                    error={!!errors.role}
                    label="Rol"
                  >
                    {roleOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {option.icon}
                          {option.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    {...register('status', { required: 'Statusul este obligatoriu' })}
                    error={!!errors.status}
                    label="Status"
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            Anulează
          </Button>
          <Button 
            onClick={handleSubmit(onSubmit)} 
            variant="contained"
          >
            Actualizează Utilizator
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirmă Ștergerea</DialogTitle>
        <DialogContent>
          <Typography>
            Ești sigur că vrei să ștergi acest utilizator? Această acțiune nu poate fi anulată.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>
            Anulează
          </Button>
          <Button 
            onClick={() => handleDelete(deleteConfirm)} 
            color="error" 
            variant="contained"
          >
            Șterge
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;
