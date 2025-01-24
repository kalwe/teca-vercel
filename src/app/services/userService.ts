
import axios from '../utils/axiosInstance'

// TODO: don`t use plural, prefer 'user'
export const getUsers = async () => {
  const response = await axios.get('/users')
  return response.data;
};

// TODO: don`t allow receive type 'any', set type with schema,
// UserSchema with Zod
export const createUser = async (userData: any) =>{
  // TODO: fiz correct indentation
const response = await axios.post('/users', userData);
return response.data
}

// TODO: use 'id: int'
export const updateUser = async (id: any, userData: any) => {
  const response = await axios.put(`/users/${id}`, userData);
  return response.data;
}

// TODO: use 'id: int'
export const deleteUser = async (id: any) => {
const response = await axios.delete(`/users/${id}`)
return response.data
}