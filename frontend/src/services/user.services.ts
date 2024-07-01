import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, { email, password });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Login failed SERVICES:', axiosError.response.data);
        throw axiosError.response.data; 
      } else {
        console.error('Network Error:', axiosError.message);
        throw new Error('Network Error. Please try again later.');
      }
    } else if (error instanceof Error) {
      console.error('Unknown Error:', error.message);
      throw new Error('Unknown Error. Please try again later.');
    } else {
      console.error('Unexpected Error:', error);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};

export const loginWithKeycloak = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/keycloak/token`, { username, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Login with Keycloak failed:', axiosError.response.data);
        throw axiosError.response.data; 
      } else {
        console.error('Network Error:', axiosError.message);
        throw new Error('Network Error. Please try again later.');
      }
    } else if (error instanceof Error) {
      console.error('Unknown Error:', error.message);
      throw new Error('Unknown Error. Please try again later.');
    } else {
      console.error('Unexpected Error:', error);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
};