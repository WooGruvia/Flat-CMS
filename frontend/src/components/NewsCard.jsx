import { useState } from 'react'
import Editable from './Editable'
import EditModal from './EditModal'
import { updateItem, deleteItem } from '../api/api'
import { useEditMode } from '../context/EditContext'
import { styles } from '../styles/styles'

export default function NewsCard({ item, sectionId, onUpdate, onDelete }) {
  const [modal, setModal] = useState(false)
  const { editMode } = useEditMode()

  const save = async (form) => {
    await updateItem(sectionId, item.id, form)
    onUpdate({ ...item, ...form })
    setModal(false)
  }

  const handleDelete = async () => {
    if (!confirm('¿Seguro que quieres eliminar esta noticia?')) return
    await deleteItem(sectionId, item.id)
    onDelete(item.id)
  }

  const fields = [
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'tag', label: 'Etiqueta', type: 'text' },
    { key: 'date', label: 'Fecha', type: 'text' }
  ]
  if (item.type !== 'image-only') fields.push({ key: 'text', label: 'Texto', type: 'textarea' })
  if (item.type !== 'text-only') fields.push({ key: 'imageUrl', label: 'URL de imagen (opcional)', type: 'text', placeholder: 'https://...' })

  return (
    <>
      <Editable onEdit={() => setModal(true)} label="✏️ Editar">
        <div style={{ ...styles.card, position: 'relative' }}>
          {editMode && (
            <button
              onClick={handleDelete}
              style={{ position: 'absolute', top: 8, left: 8, background: '#c0392b', color: '#fff', border: 'none', borderRadius: 20, padding: '4px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 700, zIndex: 10 }}
            >
              🗑️ Eliminar
            </button>
          )}
          {item.type !== 'text-only' && item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{ width: '100%', height: item.type === 'image-only' ? 200 : 160, objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
              onError={e => e.target.src = 'https://via.placeholder.com/400x200/1a3a6b/fff?text=Imagen'}
            />
          )}
          <div style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              {item.tag && <span style={styles.tag}>{item.tag}</span>}
              <span style={styles.date}>{item.date}</span>
            </div>
            <h3 style={styles.cardTitle}>{item.title}</h3>
            {item.text && <p style={styles.cardText}>{item.text}</p>}
          </div>
        </div>
      </Editable>

      {modal && (
        <EditModal
          title={`Editar: ${item.title}`}
          fields={fields}
          values={item}
          onSave={save}
          onClose={() => setModal(false)}
        />
      )}
    </>
  )
}