import { useState } from 'react'
import NewsCard from './NewsCard'
import EditModal from './EditModal'
import { addItem } from '../api/api'
import { useEditMode } from '../context/EditContext'
import { styles } from '../styles/styles'

export default function NewsSection({ section, onUpdate }) {
  const [items, setItems] = useState(section.items || [])
  const [showAddModal, setShowAddModal] = useState(false)
  const { editMode } = useEditMode()

  const updateItem = (idx, updated) => {
    const newItems = items.map((it, i) => i === idx ? updated : it)
    setItems(newItems)
    onUpdate({ ...section, items: newItems })
  }

  const handleDelete = (id) => {
    const newItems = items.filter(it => it.id !== id)
    setItems(newItems)
    onUpdate({ ...section, items: newItems })
  }

  const handleAdd = async (form) => {
    const type = form.imageUrl && form.text
      ? 'text-image'
      : form.imageUrl
        ? 'image-only'
        : 'text-only'

    const newItem = await addItem(section.id, { ...form, type })
    const newItems = [...items, newItem]
    setItems(newItems)
    onUpdate({ ...section, items: newItems })
    setShowAddModal(false)
  }

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{section.title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((item, i) => (
          <NewsCard
            key={item.id}
            item={item}
            sectionId={section.id}
            onUpdate={updated => updateItem(i, updated)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editMode && (
        <button
          onClick={() => setShowAddModal(true)}
          style={{ ...styles.btnPrimary, width: '100%', marginTop: 16, padding: '12px', fontSize: 14, borderRadius: 10 }}
        >
          + Agregar noticia
        </button>
      )}

      {showAddModal && (
        <EditModal
          title="Nueva Noticia"
          fields={[
            { key: 'title', label: 'Título', type: 'text' },
            { key: 'tag', label: 'Etiqueta', type: 'text' },
            { key: 'date', label: 'Fecha', type: 'text', placeholder: 'YYYY-MM-DD' },
            { key: 'text', label: 'Texto (opcional)', type: 'textarea' },
            { key: 'imageUrl', label: 'URL de imagen (opcional)', type: 'text', placeholder: 'https://...' }
          ]}
          values={{ title: '', tag: '', date: '', text: '', imageUrl: '' }}
          onSave={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}