import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export interface RegisterData {
    username: string;
    password: string;
    email: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

class AuthService {
    async register(data: RegisterData) {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    }

    async login(data: LoginData) {
        const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}

export default new AuthService(); 