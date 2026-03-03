import { useEditMode } from '../context/EditContext'
import { styles } from '../styles/styles'

export default function Editable({ children, onEdit, label = 'Editar' }) {
  const { editMode } = useEditMode()

  if (!editMode) return children

  return (
    <div style={{ position: 'relative', outline: '2px dashed #e8a020', borderRadius: 6 }}>
      {children}
      <button onClick={onEdit} style={styles.editBadge}>{label}</button>
    </div>
  )
}