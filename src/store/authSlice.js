import { createSlice } from '@reduxjs/toolkit';

// Initial state with persisted token from localStorage
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Handle successful login: save user and token
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // persist token
    },
    // Handle logout: clear user and token
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // remove token from storage
    },
  },
});

// Export actions and reducer
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
