import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Show error messages
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // Handle form submission
  const onSubmit = (data) => {
    if (data.email === 'admin@user.com' && data.password === 'Pass1234') {
      // Dispatch login success and navigate to clients
      dispatch(loginSuccess({ user: { email: data.email }, token: 'mock-jwt-token' }));
      navigate('/clients');
    } else {
      setSnackbarOpen(true); // Show error snackbar if credentials are invalid
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #243770 50%, #f9f9f9 50%)',
      }}
    >
      {/* Left side info panel */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          p: 6,
        }}
      >
        <Typography variant="h3" fontWeight="bold" mb={2}>
          ClientFlow CRM
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 400, textAlign: 'center', opacity: 0.9 }}>
          Manage your clients efficiently with a modern and powerful interface.
        </Typography>
      </Box>

      {/* Login form */}
      <Container
        maxWidth="sm"
        sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper
          elevation={6}
          sx={{ p: 5, borderRadius: 4, width: '100%', maxWidth: 420, bgcolor: 'white' }}
        >
          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            mb={3}
            textAlign="center"
            color="#243770"
          >
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email field */}
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password field with visibility toggle */}
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 'bold',
                bgcolor: '#243770',
                '&:hover': { bgcolor: '#1b2a59' },
              }}
            >
              Sign In
            </Button>
          </Box>

          <Typography variant="body2" color="textSecondary" mt={3} textAlign="center">
            Don’t have an account?{' '}
            <span style={{ color: '#243770', fontWeight: 'bold' }}>Contact the administrator</span>
          </Typography>
        </Paper>
      </Container>

      {/* Snackbar for invalid login */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Invalid credentials. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
}
