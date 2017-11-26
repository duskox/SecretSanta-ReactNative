import { BACKEND_URL } from 'react-native-dotenv';

export function setUser(data) {
  const url = BACKEND_URL + 'santApi/setuser';
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
}

export function joinRaffle(data) {
  const url = BACKEND_URL + 'santApi/join';
  console.log("Data for fetch", data);
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
}

export function leaveRaffle(data) {

}
