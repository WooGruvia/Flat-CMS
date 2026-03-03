import { useState } from 'react'
import { login } from '../api/api'
import { useEditMode } from '../context/EditContext'
import { styles } from '../styles/styles'

export default function LoginModal({ onClose }) {
  const { setIsAdmin, setEditMode } = useEditMode()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Completa todos los campos')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await login(username, password)
      if (res.success) {
        setIsAdmin(true)
        setEditMode(true)
        onClose()
      } else {
        setError('Usuario o contraseña incorrectos')
      }
    } catch {
      setError('No se pudo conectar con el servidor')
    }
    setLoading(false)
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>🔐 Acceso Admin</span>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={styles.label}>Usuario</label>
            <input
              style={styles.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Usuario"
            />
          </div>
          <div>
            <label style={styles.label}>Contraseña</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          {error && (
            <p style={{ color: '#c0392b', fontSize: 13, margin: 0, textAlign: 'center' }}>
              ⚠️ {error}
            </p>
          )}
        </div>
        <div style={{ padding: '12px 16px', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={styles.btnSecondary}>Cancelar</button>
          <button onClick={handleLogin} style={styles.btnPrimary} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </div>
    </div>
  )
}