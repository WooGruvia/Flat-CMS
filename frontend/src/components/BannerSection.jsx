import { useState } from 'react'
import Editable from './Editable'
import EditModal from './EditModal'
import { updateSection } from '../api/api'

export default function BannerSection({ section, onUpdate }) {
  const [modal, setModal] = useState(false)

  const save = async (form) => {
    await updateSection(section.id, form)
    onUpdate({ ...section, ...form })
    setModal(false)
  }

  return (
    <>
      <Editable onEdit={() => setModal(true)} label="✏️ Editar Banner">
        <div style={{
          position: 'relative',
          minHeight: 220,
          background: `linear-gradient(rgba(26,58,107,0.72), rgba(26,58,107,0.85)), url(${section.imageUrl}) center/cover`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '28px 20px 24px'
        }}>
          <h1 style={{
            color: '#fff',
            fontSize: 22,
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.3,
            fontFamily: "'Georgia', serif"
          }}>
            {section.title}
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 14,
            margin: '8px 0 0',
            fontStyle: 'italic'
          }}>
            {section.subtitle}
          </p>
        </div>
      </Editable>

      {modal && (
        <EditModal
          title="Editar Banner"
          fields={[
            { key: 'title', label: 'Título', type: 'text' },
            { key: 'subtitle', label: 'Subtítulo', type: 'text' },
            { key: 'imageUrl', label: 'URL de imagen', type: 'text', placeholder: 'https://...' }
          ]}
          values={section}
          onSave={save}
          onClose={() => setModal(false)}
        />
      )}
    </>
  )
}