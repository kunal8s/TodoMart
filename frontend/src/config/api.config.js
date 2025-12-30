// API Configuration
// In production, set VITE_API_URL environment variable to your Render backend URL
// Example: VITE_API_URL=https://todomart-api.onrender.com

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
    // Base
    BASE: API_BASE_URL,
    API: `${API_BASE_URL}/api`,

    // Auth
    SIGNUP: `${API_BASE_URL}/api/signup`,
    SIGNIN: `${API_BASE_URL}/api/signin`,
    LOGOUT: `${API_BASE_URL}/api/signin/logout`,

    // Todos
    TODOS: `${API_BASE_URL}/api/todos`,
    TODO_BY_ID: (id) => `${API_BASE_URL}/api/todos/${id}`,
    TODOS_BULK_DELETE: `${API_BASE_URL}/api/todos/bulk-delete`,

    // Health
    HEALTH: `${API_BASE_URL}/health`,
};

export default API_BASE_URL;
