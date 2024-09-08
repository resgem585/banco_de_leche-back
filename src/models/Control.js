import mongoose from 'mongoose';

const ControlSchema = new mongoose.Schema({
  numeroLeche: {
    type: String,
    required: true,
  },
  tipoLeche: {
    type: String,
    required: true,
    enum: ['MADURA', 'CALOSTRO', 'INTERMEDIA'],  // Opciones según la tabla
  },
  tipoDonacion: {
    type: String,
    required: true,
    enum: ['INTERNA', 'EXTERNA'],  // Opciones según la tabla
  },
  donadora: {
    type: String,
    required: true,
  },
  ml: {
    type: Number,
  },
  fechaExtraccion: {
    type: String,
  },
  horaExtraccion: {
    type: String,
  },
  sdg: {
    type: Number,
  },
  embalaje: {
    type: String,
    enum: ['CUMPLE', 'NO CUMPLE'],  // Opciones para embalaje
    default: 'CUMPLE',  // Valor por defecto
  },
  suciedad: {
    type: String,
    enum: ['CUMPLE', 'NO CUMPLE'],  // Opciones para suciedad
    default: 'CUMPLE',
  },
  color: {
    type: String,
    enum: ['CUMPLE', 'NO CUMPLE'],  // Opciones para color
    default: 'CUMPLE',
  },
  olor: {
    type: String,
    enum: ['CUMPLE', 'NO CUMPLE'],  // Opciones para olor
    default: 'CUMPLE',
  },
  crematocrito: {
    type: Number,
  },
  acidezDornic: {
    type: Number,
  },
  observaciones: {
    type: String,
    enum: [
      'NA',
      'ACIDEZ ˃8°D',
      'PRECIPITACION DE CASEINA',
      'MAL OLOR (VOMITO)',
      'VOLUMEN INSUFICIENTE',
    ],  // Opciones de observaciones según la tabla
    default: 'NA',  // Valor por defecto
  },
  donanteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donante',  // Relación uno a uno con Donante
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Hook para actualizar la fecha de `updatedAt` antes de guardar
ControlSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Control = mongoose.model('Control', ControlSchema);

export default Control;
