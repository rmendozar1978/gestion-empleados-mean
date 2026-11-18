// Mongoose permite hablar con MongoDB usando objetos JavaScript.
const mongoose = require('mongoose');

// 127.0.0.1 en lugar de 'localhost' evita problemas de IPv6 en Node 18+.
// Si la base 'gestion-empleados' no existe, MongoDB la crea automáticamente.
const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gestion-empleados';

const conectarDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('✅ MongoDB conectado en:', URI);
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:', error.message);
    process.exit(1); // Sin base de datos la API no sirve: detenemos el proceso.
  }
};

module.exports = conectarDB;
