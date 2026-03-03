import { createContext, useContext, useState } from 'react'

const EditContext = createContext(null)

export function EditProvider({ children }) {
  const [editMode, setEditMode] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const logout = () => {
    setIsAdmin(false)
    setEditMode(false)
  }

  return (
    <EditContext.Provider value={{ editMode, setEditMode, isAdmin, setIsAdmin, logout }}>
      {children}
    </EditContext.Provider>
  )
}

export function useEditMode() {
  return useContext(EditContext)
}