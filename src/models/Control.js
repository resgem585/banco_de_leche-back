import mongoose from 'mongoose';

const ControlSchema = new mongoose.Schema({
  numeroLeche: String,
  tipoLeche: String,
  tipoDonacion: String,
  donadora: String,
  ml: Number,
  fechaExtraccion: String,
  horaExtraccion: String,
  sdg: Number,
  embalaje: String,
  suciedad: String,
  color: String,
  olor: String,
  crematocrito: Number,
  acidezDornic: Number,
  observaciones: String,
  donanteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donante',  // Relación uno a uno con Donante
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Control = mongoose.model('Control', ControlSchema);

export default Control;
