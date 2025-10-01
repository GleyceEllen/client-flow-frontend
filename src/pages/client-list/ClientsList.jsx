import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, deleteClient } from '../../store/clientsSlice';
import {
  Box,
  Typography,
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ClientsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clients = useSelector((state) => state.clients.clients);

  // Fetch clients on component mount
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  // Confirm and delete client
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      dispatch(deleteClient(id));
    }
  };

  return (
    <Container sx={{ mt: 6 }}>
      {/* Header with title and add client button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', color: '#243770', letterSpacing: 1 }}
        >
          Clients
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/clients/new')}
          sx={{
            bgcolor: '#243770',
            color: '#f5f5f5',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': { bgcolor: '#1b2b58' },
          }}
        >
          Add Client
        </Button>
      </Box>

      {/* Table displaying all clients */}
      <Paper sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#243770' }}>
            <TableRow>
              <TableCell sx={{ color: '#f5f5f5', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#f5f5f5', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: '#f5f5f5', fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ color: '#f5f5f5', fontWeight: 'bold' }}>City</TableCell>
              <TableCell sx={{ color: '#f5f5f5', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client.id}
                sx={{ '&:hover': { bgcolor: 'rgba(36,55,112,0.05)' } }}
              >
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.city}</TableCell>
                <TableCell>
                  {/* Edit button */}
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/clients/${client.id}`)}
                      sx={{
                        bgcolor: 'rgba(36,55,112,0.1)',
                        '&:hover': { bgcolor: '#243770', color: '#f5f5f5' },
                        mr: 1,
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>

                  {/* Delete button */}
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(client.id)}
                      sx={{
                        bgcolor: 'rgba(255,0,0,0.1)',
                        '&:hover': { bgcolor: '#ff4d4d', color: '#fff' },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {/* Message if no clients found */}
            {clients.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography color="textSecondary">
                    No clients found. Click "Add Client" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
