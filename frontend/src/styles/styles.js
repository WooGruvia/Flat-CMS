export const styles = {
  navbar: {
    background: '#1a3a6b',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(0,0,0,0.3)'
  },
  logoBox: {
    width: 55,
    height: 36,
    borderRadius: 8,
    background: '#e82020',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  section: {
    margin: 0,
    padding: '20px 16px'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: '#1a3a6b',
    margin: '0 0 16px',
    fontFamily: "'Georgia', serif",
    borderBottom: '2px solid #e8a020',
    paddingBottom: 8
  },
  card: {
    background: '#fff',
    borderRadius: 10,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden'
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#1a3a6b',
    margin: '0 0 8px',
    lineHeight: 1.3
  },
  cardText: {
    fontSize: 13,
    color: '#444',
    lineHeight: 1.6,
    margin: 0
  },
  tag: {
    background: '#e8a020',
    color: '#fff',
    fontSize: 10,
    padding: '2px 8px',
    borderRadius: 20,
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  date: {
    fontSize: 11,
    color: '#888'
  },
  announcementRow: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    padding: '10px 12px',
    background: '#fff',
    borderRadius: 8,
    margin: '4px 0',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
  },
  galleryCaption: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.65))',
    color: '#fff',
    fontSize: 11,
    padding: '16px 8px 8px',
    borderRadius: '0 0 8px 8px'
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    background: '#fff',
    width: '100%',
    maxWidth: 480,
    borderRadius: '16px 16px 0 0',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #eee'
  },
  closeBtn: {
    border: 'none',
    background: 'none',
    fontSize: 18,
    cursor: 'pointer',
    color: '#666',
    padding: 4
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: '#555',
    display: 'block',
    marginBottom: 4
  },
  input: {
    width: '100%',
    border: '1.5px solid #ddd',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 14,
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  editBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    background: '#e8a020',
    color: '#fff',
    border: 'none',
    borderRadius: 20,
    padding: '4px 10px',
    fontSize: 11,
    cursor: 'pointer',
    fontWeight: 700,
    zIndex: 10
  },
  btnPrimary: {
    background: '#1a3a6b',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 20px',
    fontSize: 14,
    cursor: 'pointer',
    fontWeight: 600
  },
  btnSecondary: {
    background: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: 8,
    padding: '10px 20px',
    fontSize: 14,
    cursor: 'pointer',
    fontWeight: 600
  }
}