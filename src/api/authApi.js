import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Rejestracja użytkownika
export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data; 
  } catch (error) {
    throw error;  
  }
};
