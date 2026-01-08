import api from './api';

const taskService = {
    // Бүх tasks авах
    getAllTasks: async (status = '') => {
        const url = status ? `/tasks?status=${status}` : '/tasks';
        const response = await api.get(url);
        return response.data;
    },

    // Нэг task авах
    getTaskById: async (id) => {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    },

    // Task үүсгэх
    createTask: async (taskData) => {
        const response = await api.post('/tasks', taskData);
        return response.data;
    },

    // Task шинэчлэх
    updateTask: async (id, taskData) => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data;
    },

    // Task устгах
    deleteTask: async (id) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    },

    // Статистик авах
    getStats: async () => {
        const response = await api.get('/tasks/stats');
        return response.data;
    },
};

export default taskService;