const { Schema, model } = require('mongoose');

// El Schema define la forma de cada documento y sus reglas de validación.
const EmpleadoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    cargo: {
      type: String,
      required: [true, 'El cargo es obligatorio'],
      trim: true
    },
    departamento: {
      type: String,
      required: [true, 'El departamento es obligatorio'],
      trim: true
    },
    salario: {
      type: Number,
      required: [true, 'El salario es obligatorio'],
      min: [0, 'El salario no puede ser negativo']
    }
  },
  {
    timestamps: true, // createdAt y updatedAt automáticos
    versionKey: false // oculta el campo técnico __v
  }
);

// Crea la colección "empleados" (Mongoose pluraliza el nombre).
module.exports = model('Empleado', EmpleadoSchema);
