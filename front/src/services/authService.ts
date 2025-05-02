import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export interface SignUpData {
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface SignInData {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    role: string;
}

const isBrowser = typeof window !== 'undefined';

export const authService = {
    signUp: async (data: SignUpData) => {
        const response = await axios.post(`${API_URL}/signup`, data);
        return response.data;
    },

    signIn: async (data: SignInData) => {
        const response = await axios.post<AuthResponse>(`${API_URL}/signin`, data);
        if (response.data.token && isBrowser) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
        }
        return response.data;
    },

    logout: () => {
        if (isBrowser) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    },

    getToken: () => {
        if (!isBrowser) return null;
        return localStorage.getItem('token');
    },

    getRole: () => {
        if (!isBrowser) return null;
        return localStorage.getItem('role');
    },

    isAuthenticated: () => {
        if (!isBrowser) return false;
        return !!localStorage.getItem('token');
    }
}; 