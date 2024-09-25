
import mongoose from 'mongoose';

const CrematocritoSchema = new mongoose.Schema({
  numeroLeche: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Control',  // Relación con el modelo 'Control'
    unique: true  // Asegura que solo hay un registro de leche por cada control
  },
  columnaTotal1: {
    type: Number,
    required: false  // Campo opcional
  },
  columnaTotal2: {
    type: Number,
    required: false  // Campo opcional
  },
  columnaTotal3: {
    type: Number,
    required: false  // Campo opcional
  },
  promTotal: {
    type: Number,
    required: false  // Campo opcional
  },
  columnaCrema1: {
    type: Number,
    required: false  // Campo opcional
  },
  columnaCrema2: {
    type: Number,
    required: false  // Campo opcional
  },
  columnaCrema3: {
    type: Number,
    required: false  // Campo opcional
  },
  promCrema: {
    type: Number,
    required: false  // Campo opcional
  },
  porcentajeCrema: {
    type: Number,
    required: false  // Campo opcional
  },
  porcentajeGrasa: {
    type: Number,
    required: false  // Campo opcional
  },
  kcalLitro: {
    type: Number,
    required: false  // Campo opcional
  },
  observaciones: {
    type: String,
    enum: [
      'NA',
      'ACIDEZ ˃8°D',
      'PRECIPITACION DE CASEINA',
      'MAL OLOR',
      'VOLUMEN INSUFICIENTE',
    ],  // Opciones de observaciones según la tabla
    default: 'NA',  // Valor por defecto
    required: false  // Campo opcional
  }
}, {
  timestamps: true  // Añade createdAt y updatedAt automáticamente
});

// Hook para actualizar la fecha de `updatedAt` antes de guardar
CrematocritoSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Crematocrito = mongoose.model('Crematocrito', CrematocritoSchema);

export default Crematocrito;
