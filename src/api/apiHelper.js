import { BACKEND_URL } from 'react-native-dotenv';
import axios from 'axios'

export function setUser(data) {
  const url = BACKEND_URL + 'santApi/setuser';
  return axios.post(url, data)
}

export function joinRaffle(data) {
  const url = BACKEND_URL + 'santApi/join';
  return axios.post(url, data)
}

export function leaveRaffle(data) {
  const url = BACKEND_URL + 'santApi/leave';
  return axios.post(url, data)
}
