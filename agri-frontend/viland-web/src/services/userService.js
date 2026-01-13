import axios from "axios";

const API_URL = "http://localhost:8000/users";
const API_BASE_URL = "http://localhost:8000";

export const fetchUsers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateUser = async (id, user) => {
  await axios.put(`${API_URL}/${id}`, user);
}

export const createUser = async(user) =>{
    await axios.post(API_URL, user);
}

export const toggleUserActive = async (id) => {
  await axios.put(`${API_URL}/${id}/toggle-active`);
};

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
  return res.data;
};
