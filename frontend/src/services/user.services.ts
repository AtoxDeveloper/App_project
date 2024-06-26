import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class UserService {

    static async login(email: string, password: string) {
        //const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        const data = {
            userId: email,
            pass: password
        }
        return data;
    }
      
    static async getUserById(userId: string) {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    }
  }