import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 

// Header component responsible for showing the app's navigation bar
// Includes branding, user information (if logged in), and logout functionality
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access current logged user from Redux state
  const user = useSelector((state) => state.auth.user);

  // Handle logout: clear user state and navigate back to login page
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: '#243770',
        background: 'linear-gradient(90deg, #172550ff, #1b2b58)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)', // custom shadow for style
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Logo / Brand section - clicking redirects to clients page */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            gap: 1.5,
          }}
          onClick={() => navigate('/clients')}
        >
          <AccountCircleIcon sx={{ color: '#f5f5f5', fontSize: 32 }} />
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: '#f5f5f5', letterSpacing: 1 }}
          >
            ClientFlow CRM
          </Typography>
        </Box>
        
        {/* Right section: only visible when user is logged in */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Avatar showing the first letter of user email */}
            <Avatar sx={{ bgcolor: 'white', color: '#243770', fontWeight: 'bold' }}>
              {user.email?.charAt(0).toUpperCase()}
            </Avatar>

            {/* Display logged-in user email */}
            <Typography variant="body1" sx={{ color: '#f5f5f5', fontWeight: 500 }}>
              {user.email}
            </Typography>

            {/* Logout button */}
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              sx={{
                borderColor: '#f5f5f5',
                color: '#f5f5f5',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderColor: '#f5f5f5',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
