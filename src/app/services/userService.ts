
import axios from '../utils/axiosInstance'

export const getUsers = async () => {
  const response = await axios.get('/users')
  return response.data;
};

export const createUser = async (userData: any) =>{
const response = await axios.post('/users', userData);
return response.data
}

export const updateUser = async (id: any, userData: any) => {
  const response = await axios.put(`/users/${id}`, userData);
  return response.data;
}

export const deleteUser = async (id: any) => {
const response = await axios.delete(`/users/${id}`)
return response.data
}