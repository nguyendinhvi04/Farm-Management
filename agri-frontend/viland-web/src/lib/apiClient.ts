// src/lib/apiClient.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        // Thêm headers auth nếu cần
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  },

  post: async <T>(endpoint: string, body: unknown): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  }
  // Thêm PUT, DELETE nếu cần...
};