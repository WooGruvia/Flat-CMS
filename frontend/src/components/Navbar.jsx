import { useState } from 'react'
import { useEditMode } from '../context/EditContext'
import { styles } from '../styles/styles'
import LoginModal from './LoginModal'

export default function Navbar({ site }) {
  const { editMode, setEditMode, isAdmin, logout } = useEditMode()
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <nav style={styles.navbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={styles.logoBox}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 15 }}>UMSS</span>
          </div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
            {site?.name}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {!isAdmin ? (
            <button
              onClick={() => setShowLogin(true)}
              style={{ ...styles.btnPrimary, background: 'rgba(255,255,255,0.2)', fontSize: 12, padding: '6px 12px' }}
            >
              🔐 Admin
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditMode(e => !e)}
                style={{ ...styles.btnPrimary, background: editMode ? '#e8a020' : 'rgba(255,255,255,0.2)', fontSize: 12, padding: '6px 12px' }}
              >
                {editMode ? '✓ Editando' : '✏️ Editar'}
              </button>
              <button
                onClick={logout}
                style={{ ...styles.btnPrimary, background: 'rgba(255,255,255,0.15)', fontSize: 12, padding: '6px 12px' }}
              >
                Salir
              </button>
            </>
          )}
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {editMode && (
        <div style={{ background: '#e8a020', color: '#fff', padding: '8px 16px', fontSize: 12, textAlign: 'center', fontWeight: 600 }}>
          MODO EDICION — Toca cualquier seccion para editar
        </div>
      )}
    </>
  )
}