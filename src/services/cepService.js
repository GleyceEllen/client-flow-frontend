import axios from 'axios';

/**
 * Fetch address data from Brazilian CEP using BrasilAPI
 * @param {string} cep - CEP (only digits, 8 characters)
 * @returns {object|null} Address data { street, city, state } or null if not found
 */
export const getAddressByCEP = async (cep) => {
  try {
    const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
    
    return {
      address: response.data.street || '',
      city: response.data.city || '',
      state: response.data.state || '',
    };
  } catch (error) {
    console.error('Error fetching CEP from BrasilAPI:', error);
    return null;
  }
};
