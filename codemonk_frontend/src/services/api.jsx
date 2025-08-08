import axios from 'axios'
import { getToken, removeToken } from '../utils/auth'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // backend API base URL
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized - remove token and redirect to login
      removeToken()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
