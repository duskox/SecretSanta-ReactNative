import { BACKEND_URL } from 'react-native-dotenv';
import axios from 'axios'

export function setUser(data) {
  const url = BACKEND_URL + 'santApi/setuser';
  // return fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data)
  // })
  return axios.post(url, data)
}

export function joinRaffle(data) {
  const url = BACKEND_URL + 'santApi/join';
  // return fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data)
  // })
  return axios.post(url, data)
}

export function leaveRaffle(data) {
  const url = BACKEND_URL + 'santApi/leave';
  // return fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data)
  // })
  return axios.post(url, data)
}
