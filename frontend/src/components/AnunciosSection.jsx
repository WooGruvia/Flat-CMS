import { useState } from 'react'
import Editable from './Editable'
import EditModal from './EditModal'
import { updateItem, addItem, deleteItem } from '../api/api'
import { useEditMode } from '../context/EditContext'
import { styles } from '../styles/styles'

export default function AnunciosSection({ section }) {
  const [items, setItems] = useState(section.items || [])
  const [showAddModal, setShowAddModal] = useState(false)
  const { editMode } = useEditMode()

  const updateItemLocal = (idx, updated) => {
    setItems(items.map((it, i) => i === idx ? updated : it))
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este aviso?')) return
    await deleteItem(section.id, id)
    setItems(items.filter(it => it.id !== id))
  }

  const handleAdd = async (form) => {
    const newItem = await addItem(section.id, form)
    setItems([...items, newItem])
    setShowAddModal(false)
  }

  return (
    <div style={{ ...styles.section, background: '#fff9ee', borderLeft: '4px solid #e8a020' }}>
      <h2 style={{ ...styles.sectionTitle, color: '#b07a10' }}>{section.title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item, i) => (
          <AnuncioItem
            key={item.id}
            item={item}
            sectionId={section.id}
            onUpdate={updated => updateItemLocal(i, updated)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editMode && (
        <button
          onClick={() => setShowAddModal(true)}
          style={{ ...styles.btnPrimary, width: '100%', marginTop: 12, padding: '12px', fontSize: 14, borderRadius: 10, background: '#b07a10' }}
        >
          + Agregar aviso
        </button>
      )}

      {showAddModal && (
        <EditModal
          title="Nuevo Aviso"
          fields={[
            { key: 'icon', label: 'Emoji', type: 'text', placeholder: '📅' },
            { key: 'text', label: 'Texto del aviso', type: 'textarea' }
          ]}
          values={{ icon: '📌', text: '' }}
          onSave={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}

function AnuncioItem({ item, sectionId, onUpdate, onDelete }) {
  const [modal, setModal] = useState(false)
  const { editMode } = useEditMode()

  const save = async (form) => {
    await updateItem(sectionId, item.id, form)
    onUpdate({ ...item, ...form })
    setModal(false)
  }

  return (
    <>
      <Editable onEdit={() => setModal(true)} label="✏️">
        <div style={{ ...styles.announcementRow, position: 'relative' }}>
            {editMode && (
                <button
                    onClick={() => onDelete(item.id)}
                    style={{ position: 'absolute', top: -3, left: 2, background: '#c0392b', color: '#fff', border: 'none', borderRadius: 20, padding: '4px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 700, zIndex: 10 }}
                    >
                    🗑️
                </button>
            )}
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            <span style={{ fontSize: 14, color: '#333', lineHeight: 1.4, flex: 1 }}>{item.text}</span>
        </div>
      </Editable>

      {modal && (
        <EditModal
          title="Editar Aviso"
          fields={[
            { key: 'icon', label: 'Emoji', type: 'text' },
            { key: 'text', label: 'Texto', type: 'textarea' }
          ]}
          values={item}
          onSave={save}
          onClose={() => setModal(false)}
        />
      )}
    </>
  )
}