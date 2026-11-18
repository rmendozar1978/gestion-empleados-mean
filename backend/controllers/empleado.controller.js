const mongoose = require('mongoose');
const Empleado = require('../models/empleado');

const empleadoCtrl = {};

// ---------- Funciones auxiliares ----------

// Un _id de MongoDB válido tiene 24 caracteres hexadecimales.
const idInvalido = (id) => !mongoose.isValidObjectId(id);

// Solo aceptamos estos campos del body (evita campos no previstos).
const filtrarCampos = ({ nombre, cargo, departamento, salario }) => ({
  nombre, cargo, departamento, salario
});

// Respuesta estándar para errores.
const manejarError = (res, error) => {
  if (error.name === 'ValidationError') {
    const detalles = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ status: 'error', mensaje: 'Datos inválidos', detalles });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ status: 'error', mensaje: 'Tipo de dato inválido: ' + error.path });
  }
  console.error(error);
  return res.status(500).json({ status: 'error', mensaje: 'Error interno del servidor' });
};

const noEncontrado = (res) =>
  res.status(404).json({ status: 'error', mensaje: 'Empleado no encontrado' });

const idMalo = (res) =>
  res.status(400).json({ status: 'error', mensaje: 'El id no tiene un formato válido' });

// ---------- READ: listar todos (GET /api/empleados) ----------
empleadoCtrl.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find().sort({ createdAt: -1 });
    res.status(200).json(empleados);
  } catch (error) {
    manejarError(res, error);
  }
};

// ---------- READ: uno por id (GET /api/empleados/:id) ----------
empleadoCtrl.getEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    if (idInvalido(id)) return idMalo(res);
    const empleado = await Empleado.findById(id);
    if (!empleado) return noEncontrado(res);
    res.status(200).json(empleado);
  } catch (error) {
    manejarError(res, error);
  }
};

// ---------- CREATE (POST /api/empleados) ----------
empleadoCtrl.crearEmpleado = async (req, res) => {
  try {
    const empleado = new Empleado(filtrarCampos(req.body));
    await empleado.save(); // aquí se ejecutan las validaciones del Schema
    res.status(201).json(empleado);
  } catch (error) {
    manejarError(res, error);
  }
};

// ---------- UPDATE (PUT /api/empleados/:id) ----------
empleadoCtrl.editarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    if (idInvalido(id)) return idMalo(res);
    // new: true -> devuelve el documento actualizado
    // runValidators: true -> aplica las reglas del Schema también al actualizar
    const empleado = await Empleado.findByIdAndUpdate(id, filtrarCampos(req.body), {
      new: true,
      runValidators: true
    });
    if (!empleado) return noEncontrado(res);
    res.status(200).json(empleado);
  } catch (error) {
    manejarError(res, error);
  }
};

// ---------- DELETE (DELETE /api/empleados/:id) ----------
empleadoCtrl.eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    if (idInvalido(id)) return idMalo(res);
    const empleado = await Empleado.findByIdAndDelete(id);
    if (!empleado) return noEncontrado(res);
    res.status(200).json({ status: 'ok', mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    manejarError(res, error);
  }
};

module.exports = empleadoCtrl;
