import { useState } from 'react'
import Editable from './Editable'
import EditModal from './EditModal'
import { updateItem } from '../api/api'
import { styles } from '../styles/styles'

export default function GaleriaSection({ section }) {
  const [items, setItems] = useState(section.items || [])

  const updateItemLocal = (idx, updated) => {
    setItems(items.map((it, i) => i === idx ? updated : it))
  }

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{section.title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {items.map((item, i) => (
          <GaleriaItem
            key={item.id}
            item={item}
            sectionId={section.id}
            onUpdate={updated => updateItemLocal(i, updated)}
          />
        ))}
      </div>
    </div>
  )
}

function GaleriaItem({ item, sectionId, onUpdate }) {
  const [modal, setModal] = useState(false)

  const save = async (form) => {
    await updateItem(sectionId, item.id, form)
    onUpdate({ ...item, ...form })
    setModal(false)
  }

  return (
    <>
      <Editable onEdit={() => setModal(true)} label="✏️">
        <div style={{ position: 'relative' }}>
          <img
            src={item.imageUrl}
            alt={item.caption}
            style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 8 }}
            onError={e => e.target.src = 'https://via.placeholder.com/300x130/1a3a6b/fff?text=Imagen'}
          />
          <div style={styles.galleryCaption}>{item.caption}</div>
        </div>
      </Editable>

      {modal && (
        <EditModal
          title="Editar imagen"
          fields={[
            { key: 'imageUrl', label: 'URL de imagen', type: 'text', placeholder: 'https://...' },
            { key: 'caption', label: 'Descripcion', type: 'text' }
          ]}
          values={item}
          onSave={save}
          onClose={() => setModal(false)}
        />
      )}
    </>
  )
}