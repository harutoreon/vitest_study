import axios from 'axios'

const API_BASE_URL = 'https://example.com/api'

export async function fetchUser(userId) {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}`)
  return response.data
}

export async function fetchUserList() {
  const response = await axios.get(`${API_BASE_URL}/users`)
  return response.data
}