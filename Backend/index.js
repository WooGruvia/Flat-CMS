const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/news.routes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api', newsRoutes);

//Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'CMS Universitario funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});