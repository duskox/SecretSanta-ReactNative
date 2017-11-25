

export function setUser(data) {
  return fetch(process.env.BACKEND_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
}

export function joinRaffle(data) {

}

export function leaveRaffle(data) {
  
}
