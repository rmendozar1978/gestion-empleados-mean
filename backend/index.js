const express = require('express');
const cors = require('cors');
const conectarDB = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Conectar a la base de datos
conectarDB();

// 2. Middlewares
// CORS: permite que Angular (puerto 4200) consuma esta API (puerto 3000).
app.use(cors({ origin: 'http://localhost:4200' }));
// Convierte el JSON del body en un objeto JavaScript (req.body).
app.use(express.json());

// 3. Rutas
app.get('/', (req, res) => res.json({ mensaje: 'API Gestión de Empleados operativa' }));
app.use('/api/empleados', require('./routes/empleado.routes'));

// 4. Ruta no encontrada (404 genérico)
app.use((req, res) => {
  res.status(404).json({ status: 'error', mensaje: 'Ruta ' + req.originalUrl + ' no encontrada' });
});

// 5. JSON mal formado en el body -> 400 en lugar de un error HTML
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 'error', mensaje: 'El JSON enviado está mal formado' });
  }
  next(err);
});

// 6. Arrancar el servidor
app.listen(PORT, () => console.log('🚀 Servidor escuchando en http://localhost:' + PORT));
