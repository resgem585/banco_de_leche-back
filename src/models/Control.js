import mongoose from 'mongoose';

const ControlSchema = new mongoose.Schema({
  numeroLeche: {
    type: String,
    required: false,  // Cambiado a `false` para que sea opcional
  },
  tipoLeche: {
    type: String,
    required: false,  // Cambiado a `false` para que sea opcional
    enum: ['MADURA', 'CALOSTRO', 'INTERMEDIA'],  // Opciones según la tabla
  },
  tipoDonacion: {
    type: String,
    required: false,  // Cambiado a `false` para que sea opcional
    enum: ['INTERNA', 'EXTERNA'],  // Opciones según la tabla
  },
  donadora: {
    type: String,
    required: false,  // Cambiado a `false` para que sea opcional
  },
  ml: {
    type: Number,
    required: false,  // Cambiado a `false` para que sea opcional
  },
  fechaExtraccion: {
    type: String,
    required: false,  // Cambiado a `false` para que sea opcional
  },
  horaExtraccion: {
    type: String,
    required: false,  // Cambiado a `false` para que sea opcional
  },
  sdg: {
    type: Number,
    required: false,  // Cambiado a `false` para que sea opcional
  },
  embalaje: {
    type: String,
    enum: ['CUMPLE', 'NO CUMPLE'],  // Opciones para embalaje
    default: 'CUMPLE',  // Valor por defecto
    required: false,  // Cambiado a `false` para que sea opcional
  },
  suciedad: {
    type: String,
    enum: ['CUMPLE', 'NO CUMPLE'],  // Opciones para suciedad
    default: 'CUMPLE',
    required: false,  // Cambiado a `false` para que sea opcional
  },
  color: {
    type: String,
    enum: ['CUMPLE', 'NO CUMPLE'],  // Opciones para color
    default: 'CUMPLE',
    required: false,  // Cambiado a `false` para que sea opcional
  },
  olor: {
    type: String,
    enum: ['CUMPLE', 'NO CUMPLE'],  // Opciones para olor
    default: 'CUMPLE',
    required: false,  // Cambiado a `false` para que sea opcional
  },
  crematocrito: {
    type: Number,
    required: false,  // Cambiado a `false` para que sea opcional
  },
  acidezDornic: {
    type: Number,
    required: false,  // Cambiado a `false` para que sea opcional
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
    required: false,  // Cambiado a `false` para que sea opcional
  },
  donanteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donante',  // Relación uno a uno con Donante
    required: true,  // Este campo sigue siendo obligatorio para mantener la relación
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
