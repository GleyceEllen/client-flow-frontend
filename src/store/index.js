import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import clientsReducer from './clientsSlice';

// Configure Redux store with authentication and clients slices
const store = configureStore({
  reducer: {
    auth: authReducer,     // Handles login/logout and token state
    clients: clientsReducer, // Handles CRUD operations for clients
  },
});

export default store;
