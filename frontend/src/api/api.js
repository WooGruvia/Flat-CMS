const API = 'http://localhost:3001/api'

export const login = async (username, password) => {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  return res.json()
}

export const getData = async () => {
  const res = await fetch(`${API}/data`)
  return res.json()
}

export const updateSection = async (id, body) => {
  const res = await fetch(`${API}/section/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return res.json()
}

export const addItem = async (sectionId, body) => {
  const res = await fetch(`${API}/section/${sectionId}/item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return res.json()
}

export const updateItem = async (sectionId, itemId, body) => {
  const res = await fetch(`${API}/section/${sectionId}/item/${itemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return res.json()
}

export const deleteItem = async (sectionId, itemId) => {
  const res = await fetch(`${API}/section/${sectionId}/item/${itemId}`, {
    method: 'DELETE'
  })
  return res.json()
}

export const updateSite = async (body) => {
  const res = await fetch(`${API}/site`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return res.json()
}