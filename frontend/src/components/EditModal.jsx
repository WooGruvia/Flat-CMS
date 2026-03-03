import { useState } from 'react'
import { styles } from '../styles/styles'

export default function EditModal({ fields, values, onSave, onClose, title }) {
  const [form, setForm] = useState(values)
  const change = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>{title}</span>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {fields.map(f => (
            <div key={f.key}>
              <label style={styles.label}>{f.label}</label>
              {f.type === 'textarea'
                ? <textarea rows={4} style={styles.input} value={form[f.key] || ''} onChange={e => change(f.key, e.target.value)} />
                : <input style={styles.input} value={form[f.key] || ''} onChange={e => change(f.key, e.target.value)} placeholder={f.placeholder || ''} />
              }
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 16px', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={styles.btnSecondary}>Cancelar</button>
          <button onClick={() => onSave(form)} style={styles.btnPrimary}>Guardar</button>
        </div>
      </div>
    </div>
  )
}