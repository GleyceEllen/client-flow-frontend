import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:4000/clients';

// Async thunk to fetch all clients
export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Async thunk to add a new client
export const addClient = createAsyncThunk('clients/addClient', async (client) => {
  const response = await axios.post(API_URL, client);
  return response.data;
});

// Async thunk to update an existing client
export const updateClient = createAsyncThunk('clients/updateClient', async (client) => {
  const response = await axios.put(`${API_URL}/${client.id}`, client);
  return response.data;
});

// Async thunk to delete a client
export const deleteClient = createAsyncThunk('clients/deleteClient', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState: { clients: [], status: 'idle' },
  extraReducers: (builder) => {
    builder
      // Populate clients after fetching
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.clients = action.payload;
      })
      // Add new client to state
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      // Update client in state
      .addCase(updateClient.fulfilled, (state, action) => {
        const index = state.clients.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.clients[index] = action.payload;
      })
      // Remove deleted client from state
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(c => c.id !== action.payload);
      });
  },
});

export default clientsSlice.reducer;
