import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addClient, updateClient, fetchClients } from '../../store/clientsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  LocationCity as CityIcon,
  LocationOn as StateIcon,
  LocalPostOffice as ZipIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { getAddressByCEP } from '../../services/cepService';

export default function ClientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get client ID from route
  const clients = useSelector((state) => state.clients.clients);

  const [loadingZip, setLoadingZip] = useState(false); // Show loader when fetching ZIP
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' }); // Feedback messages

  // Fetch clients if not already loaded
  useEffect(() => {
    if (!clients || clients.length === 0) dispatch(fetchClients());
  }, [clients, dispatch]);

  const clientsLoaded = Array.isArray(clients) && clients.length > 0;
  const clientToEdit = clientsLoaded && id ? clients.find((c) => String(c.id) === String(id)) : null;

  // Initialize react-hook-form with default values
  const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'br',
    },
  });

  // Populate form if editing an existing client
  useEffect(() => {
    if (clientToEdit) {
      reset({
        name: clientToEdit.name || '',
        email: clientToEdit.email || '',
        phone: clientToEdit.phone || '',
        address: clientToEdit.address || '',
        city: clientToEdit.city || '',
        state: clientToEdit.state || '',
        zip: clientToEdit.zip || '',
        country: clientToEdit.country || 'br',
      });
    }
  }, [clientToEdit, reset]);

  const zip = watch('zip'); // Watch ZIP input changes

  // Debounced function to fetch address by ZIP
  const fetchAddressDebounced = React.useMemo(
    () =>
      debounce(async (cep) => {
        if (!cep || cep.length !== 8) return;
        try {
          setLoadingZip(true);
          const data = await getAddressByCEP(cep);
          if (data) {
            setValue('address', data.address);
            setValue('city', data.city);
            setValue('state', data.state);
          } else {
            setValue('address', '');
            setValue('city', '');
            setValue('state', '');
            setSnackbar({ open: true, message: 'ZIP code not found', severity: 'error' });
          }
        } catch (error) {
          console.error(error);
          setSnackbar({ open: true, message: 'Error fetching address', severity: 'error' });
        } finally {
          setLoadingZip(false);
        }
      }, 800),
    [setValue]
  );

  // Trigger address fetch when ZIP changes
  useEffect(() => {
    if (zip && (!clientToEdit || zip !== clientToEdit.zip)) fetchAddressDebounced(zip);
    return () => fetchAddressDebounced.cancel(); // Cleanup on unmount
  }, [zip, clientToEdit, fetchAddressDebounced]);

  // Handle form submission for add or update
  const onSubmit = (data) => {
    if (clientToEdit) {
      dispatch(updateClient({ ...data, id: clientToEdit.id }));
      setSnackbar({ open: true, message: 'Client updated successfully!', severity: 'success' });
    } else {
      dispatch(addClient(data));
      setSnackbar({ open: true, message: 'Client added successfully!', severity: 'success' });
    }
    navigate('/clients'); // Redirect to clients list after submit
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Show loading state if clients not loaded
  if (!clientsLoaded) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h6" textAlign="center">
          Loading clients...
        </Typography>
      </Container>
    );
  }

  // Handle invalid client ID in edit mode
  if (id && !clientToEdit) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h6" color="error" textAlign="center">
          Client not found.
        </Typography>
        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            sx={{ bgcolor: '#243770', '&:hover': { bgcolor: '#1b2b58' } }}
            onClick={() => navigate('/clients')}
          >
            Back to Clients List
          </Button>
        </Box>
      </Container>
    );
  }

  // Render form
  return (
    <Container maxWidth="sm" sx={{ mt: 3, mb: 3 }}>
      <Paper
        elevation={12}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: '#f5f5f5',
          boxShadow: '0 8px 16px rgba(36,55,112,0.15)',
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2, color: '#243770', fontWeight: 'bold' }}
        >
          Back
        </Button>

        <Typography
          variant="h5"
          mb={3}
          textAlign="center"
          sx={{ color: '#243770', fontWeight: 'bold', letterSpacing: 0.5 }}
        >
          {clientToEdit ? 'Edit Client' : 'Add New Client'}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {/* Render all form fields dynamically */}
          {[
            { label: 'Name', name: 'name', icon: <PersonIcon />, type: 'text' },
            { label: 'Email', name: 'email', icon: <EmailIcon />, type: 'email' },
            { label: 'Phone', name: 'phone', icon: <PhoneIcon />, type: 'text' },
            {
              label: 'ZIP / Postal Code',
              name: 'zip',
              icon: <ZipIcon />,
              type: 'text',
              endAdornment: loadingZip ? <CircularProgress size={18} /> : null,
              helperText: 'Only Brazilian ZIP codes (8 digits) are accepted',
            },
            { label: 'Address', name: 'address', icon: <HomeIcon />, type: 'text' },
            { label: 'City', name: 'city', icon: <CityIcon />, type: 'text' },
            { label: 'State', name: 'state', icon: <StateIcon />, type: 'text' },
          ].map((field) => (
            <TextField
              key={field.name}
              label={`${field.label} *`}
              fullWidth
              type={field.type}
              {...register(field.name, { required: `${field.label} is required` })}
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message || field.helperText || ''}
              InputProps={{
                startAdornment: <InputAdornment position="start">{field.icon}</InputAdornment>,
                endAdornment: field.endAdornment ? <InputAdornment position="end">{field.endAdornment}</InputAdornment> : null,
              }}
              sx={{
                bgcolor: '#fff',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#243770' },
                  '&:hover fieldset': { borderColor: '#243770' },
                },
              }}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.6,
              bgcolor: '#243770',
              color: '#f5f5f5',
              fontWeight: 'bold',
              fontSize: 15,
              '&:hover': { bgcolor: '#1b2b58' },
              boxShadow: '0 4px 10px rgba(36,55,112,0.2)',
            }}
          >
            {clientToEdit ? 'Update Client' : 'Add Client'}
          </Button>
        </Box>
      </Paper>

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
