import { useState, useEffect } from 'react'
import { EditProvider } from './context/EditContext'
import { getData } from './api/api'
import Navbar from './components/Navbar'
import BannerSection from './components/BannerSection'
import NewsSection from './components/NewsSection'
import AnunciosSection from './components/AnunciosSection'
import GaleriaSection from './components/GaleriaSection'

export default function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const updateSection = (idx, updated) => {
    setData(d => ({
      ...d,
      sections: d.sections.map((s, i) => i === idx ? updated : s)
    }))
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f4f8', flexDirection: 'column' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🎓</div>
      <p style={{ color: '#1a3a6b', fontWeight: 600 }}>Cargando...</p>
    </div>
  )

  if (!data) return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <p>No se pudo conectar con el servidor.</p>
    </div>
  )

  return (
    <EditProvider>
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#f0f4f8', fontFamily: "'Segoe UI', sans-serif" }}>
        <Navbar site={data.site} />
        {data.sections.filter(s => s.visible !== false).map((section, i) => {
          const props = { key: section.id, section, onUpdate: u => updateSection(i, u) }
          if (section.type === 'hero') return <BannerSection {...props} />
          if (section.type === 'news-grid') return <NewsSection {...props} />
          if (section.type === 'announcements') return <AnunciosSection {...props} />
          if (section.type === 'gallery') return <GaleriaSection {...props} />
          return null
        })}
        <footer style={{ background: '#1a3a6b', color: 'rgba(255,255,255,0.7)', textAlign: 'center', padding: '20px 16px', fontSize: 12 }}>
          <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>{data.site?.name}</div>
          © {new Date().getFullYear()} — Todos los derechos reservados
        </footer>
      </div>
    </EditProvider>
  )
}