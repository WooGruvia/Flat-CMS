const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data.json');

//Credenciales del admin
const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234';

const defaultData = {
  site: {
    name: "Universidad Mayor de San Simon",
    primaryColor: "#1a3a6b",
    accentColor: "#e8a020"
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      title: "Bienvenidos a la Universidad Mayor de San Simon",
      subtitle: "Formando líderes para el futuro",
      imageUrl: "https://dppys.umss.edu.bo/wp-content/uploads/2023/10/paseoUniversitario.jpg",
      visible: true
    },
    {
      id: "noticias-principales",
      type: "news-grid",
      title: "Noticias Principales",
      visible: true,
      items: [
        {
          id: "n1",
          type: "text-image",
          title: "Convocatoria de Beca Comedor 2026",
          text: "La universidad abre convocatoria para las Becas Comedor destinadas a estudiantes de bajos recursos con excelencia académica.",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrjywUs9O5bNZmXnbEaumfIQQaKOUKIiSYhA&s",
          date: "2026-03-01",
          tag: "Becas"
        },
        {
          id: "n2",
          type: "image-only",
          title: "OH SANSI 2026",
          imageUrl: "https://ohsansi.umss.edu.bo/versionesanteriores/2024/images/logo.png",
          date: "2026-08-05",
          tag: "Eventos"
        },
        {
          id: "n3",
          type: "text-only",
          title: "Nuevo Programa de Intercambio Internacional",
          text: "Se han firmado convenios con varias universidades de Europa y América Latina para programas de intercambio estudiantil durante el año académico 2026-2027.",
          date: "20256-06-05",
          tag: "Internacional"
        }
      ]
    },
    {
      id: "avisos",
      type: "announcements",
      title: "Avisos Importantes",
      visible: true,
      items: [
        { id: "a1", text: "Inscripción de materias: 15 al 20 de marzo", icon: "📅" },
        { id: "a2", text: "Biblioteca abierta fines de semana durante parciales", icon: "📚" },
        { id: "a3", text: "Taller de orientación vocacional — Jueves 4pm, Aula Magna", icon: "🎯" }
      ]
    },
    {
      id: "galeria",
      type: "gallery",
      title: "Galería",
      visible: true,
      items: [
        { id: "g1", imageUrl: "https://www.opinion.com.bo/asset/thumbnail,992,558,center,center/media/opinion/images/2024/11/12/2024111223314366786.jpg", caption: "Entrada principal" },
        { id: "g2", imageUrl: "https://www.opinion.com.bo/media/opinion/images/2021/07/14/2021071422541496608.jpg", caption: "Laboratorios" },
        { id: "g3", imageUrl: "https://iifhce.hum.umss.edu.bo/img/biblioteca/atencion-cliente.jpg", caption: "Biblioteca" },
        { id: "g4", imageUrl: "https://www.umss.edu.bo/wp-content/uploads/2022/11/equipoUMSS.png", caption: "ICPC" }
      ]
    }
  ]
};

function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return defaultData;
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

//Login
const login = (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }
};

//Obtener contenido
const getData = (req, res) => {
  res.json(readData());
};

const updateSite = (req, res) => {
  const data = readData();
  data.site = { ...data.site, ...req.body };
  writeData(data);
  res.json(data.site);
};

//Editar una seccion completa
const updateSection = (req, res) => {
  const data = readData();
  const idx = data.sections.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Sección no encontrada' });
  data.sections[idx] = { ...data.sections[idx], ...req.body };
  writeData(data);
  res.json(data.sections[idx]);
};

//Editar un item dentro de una seccion
const updateItem = (req, res) => {
  const data = readData();
  const section = data.sections.find(s => s.id === req.params.sectionId);
  if (!section) return res.status(404).json({ error: 'Sección no encontrada' });
  const itemIdx = section.items.findIndex(i => i.id === req.params.itemId);
  if (itemIdx === -1) return res.status(404).json({ error: 'Item no encontrado' });
  section.items[itemIdx] = { ...section.items[itemIdx], ...req.body };
  writeData(data);
  res.json(section.items[itemIdx]);
};

//Agregar un item nuevo a una seccion
const addItem = (req, res) => {
  const data = readData();
  const section = data.sections.find(s => s.id === req.params.sectionId);
  if (!section) return res.status(404).json({ error: 'Sección no encontrada' });
  const newItem = {
    id: 'n' + Date.now(),
    ...req.body
  };
  section.items.push(newItem);
  writeData(data);
  res.json(newItem);
};

//Eliminar un item de una seccion
const deleteItem = (req, res) => {
  const data = readData();
  const section = data.sections.find(s => s.id === req.params.sectionId);
  if (!section) return res.status(404).json({ error: 'Sección no encontrada' });
  section.items = section.items.filter(i => i.id !== req.params.itemId);
  writeData(data);
  res.json({ success: true });
};

module.exports = { login, getData, updateSite, updateSection, updateItem, addItem, deleteItem };