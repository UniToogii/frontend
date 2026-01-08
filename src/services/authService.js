import api from './api';

const authService = {
    // Бүртгүүлэх
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Нэвтрэх
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Гарах
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Одоогийн хэрэглэгч
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Token байгаа эсэх
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
};

export default authService;