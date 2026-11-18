const express = require('express');
const router = express.Router();
const empleadoCtrl = require('../controllers/empleado.controller');

// Verbo HTTP + ruta -> función del controlador. El prefijo /api/empleados se define en index.js.
router.get('/', empleadoCtrl.getEmpleados);           // GET    /api/empleados
router.post('/', empleadoCtrl.crearEmpleado);         // POST   /api/empleados
router.get('/:id', empleadoCtrl.getEmpleado);         // GET    /api/empleados/:id
router.put('/:id', empleadoCtrl.editarEmpleado);      // PUT    /api/empleados/:id
router.delete('/:id', empleadoCtrl.eliminarEmpleado); // DELETE /api/empleados/:id

module.exports = router;
