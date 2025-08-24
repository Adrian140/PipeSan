import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
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
  Grid,
  Divider,
  IconButton,
  Collapse
} from '@mui/material';
import {
  Visibility,
  Edit,
  Email,
  Print,
  ExpandMore,
  ExpandLess,
  LocalShipping,
  CheckCircle,
  Cancel,
  Pending
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';

const OrderManagement = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [alert, setAlert] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD-001',
      customerName: 'Jean Dupont',
      customerEmail: 'jean.dupont@email.com',
      customerPhone: '+33 6 12 34 56 78',
      orderDate: '2024-01-15',
      status: 'pending',
      totalAmount: 245.50,
      shippingAddress: '12 Rue de la Paix, 75001 Paris, France',
      items: [
        { name: 'Racord Flexibil Premium 1/2"', quantity: 2, price: 45.99 },
        { name: 'Robinet Monocomandă', quantity: 1, price: 189.99 }
      ],
      notes: 'Client solicită livrare urgentă'
    },
    {
      id: 'ORD-002',
      customerName: 'Marie Martin',
      customerEmail: 'marie.martin@email.com',
      customerPhone: '+33 6 87 65 43 21',
      orderDate: '2024-01-14',
      status: 'processing',
      totalAmount: 156.75,
      shippingAddress: '45 Avenue des Champs, 69000 Lyon, France',
      items: [
        { name: 'Set Teflon Professional', quantity: 3, price: 12.99 },
        { name: 'Sifon Extensibil', quantity: 2, price: 67.99 }
      ],
      notes: ''
    },
    {
      id: 'ORD-003',
      customerName: 'Pierre Dubois',
      customerEmail: 'pierre.dubois@email.com',
      customerPhone: '+33 6 55 44 33 22',
      orderDate: '2024-01-13',
      status: 'shipped',
      totalAmount: 89.99,
      shippingAddress: '78 Rue du Commerce, 13000 Marseille, France',
      items: [
        { name: 'Racord Compresie 20mm', quantity: 4, price: 23.50 }
      ],
      notes: 'Comandă pentru renovare baie'
    }
  ];

  const statusOptions = [
    { value: 'pending', label: 'În Așteptare', color: 'warning' },
    { value: 'processing', label: 'În Procesare', color: 'info' },
    { value: 'shipped', label: 'Expediat', color: 'primary' },
    { value: 'delivered', label: 'Livrat', color: 'success' },
    { value: 'cancelled', label: 'Anulat', color: 'error' }
  ];

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Pending />;
      case 'processing': return <Edit />;
      case 'shipped': return <LocalShipping />;
      case 'delivered': return <CheckCircle />;
      case 'cancelled': return <Cancel />;
      default: return <Pending />;
    }
  };

  const getStatusConfig = (status) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setValue('status', order.status);
    setValue('notes', order.notes);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
    reset();
  };

  const onSubmit = (data) => {
    try {
      setOrders(prev => prev.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: data.status, notes: data.notes }
          : order
      ));
      setAlert({ type: 'success', message: 'Comanda a fost actualizată cu succes!' });
      handleCloseDialog();
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      setAlert({ type: 'error', message: 'A apărut o eroare. Încercați din nou.' });
      setTimeout(() => setAlert(null), 3000);
    }
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

  const toggleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Gestionare Comenzi
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Administrează și procesează comenzile clienților
      </Typography>

      {alert && (
        <Alert severity={alert.type} sx={{ mb: 3 }}>
          {alert.message}
        </Alert>
      )}

      {/* Orders Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statusOptions.map((status) => {
          const count = orders.filter(order => order.status === status.value).length;
          return (
            <Grid item xs={12} sm={6} md={2.4} key={status.value}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color={`${status.color}.main`} sx={{ fontWeight: 'bold' }}>
                    {count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {status.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Comandă</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Acțiuni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              return (
                <React.Fragment key={order.id}>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {order.customerName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.customerEmail}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell>
                      <Chip 
                        icon={getStatusIcon(order.status)}
                        label={statusConfig.label}
                        color={statusConfig.color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {formatPrice(order.totalAmount)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => toggleExpandOrder(order.id)}
                          color="primary"
                        >
                          {expandedOrder === order.id ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(order)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="secondary"
                        >
                          <Email />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="info"
                        >
                          <Print />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6} sx={{ py: 0 }}>
                      <Collapse in={expandedOrder === order.id} timeout="auto" unmountOnExit>
                        <Box sx={{ py: 3 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="h6" gutterBottom>
                                Detalii Client
                              </Typography>
                              <Typography variant="body2">
                                <strong>Nume:</strong> {order.customerName}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Email:</strong> {order.customerEmail}
                              </Typography>
                              <Typography variant="body2">
                                <strong>Telefon:</strong> {order.customerPhone}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                <strong>Adresa de livrare:</strong><br />
                                {order.shippingAddress}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography variant="h6" gutterBottom>
                                Produse Comandate
                              </Typography>
                              {order.items.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                  <Typography variant="body2">
                                    {item.name} x {item.quantity}
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {formatPrice(item.price * item.quantity)}
                                  </Typography>
                                </Box>
                              ))}
                              <Divider sx={{ my: 1 }} />
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                  Total:
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                  {formatPrice(order.totalAmount)}
                                </Typography>
                              </Box>
                              {order.notes && (
                                <Box sx={{ mt: 2 }}>
                                  <Typography variant="body2">
                                    <strong>Note:</strong> {order.notes}
                                  </Typography>
                                </Box>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Order Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Editează Comanda {selectedOrder?.id}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status Comandă</InputLabel>
                  <Select
                    {...register('status', { required: 'Statusul este obligatoriu' })}
                    error={!!errors.status}
                    label="Status Comandă"
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStatusIcon(option.value)}
                          {option.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Note Administrative"
                  multiline
                  rows={4}
                  {...register('notes')}
                  helperText="Note interne pentru această comandă"
                />
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
            Actualizează Comanda
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderManagement;
