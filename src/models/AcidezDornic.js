// models/AcidezDornic.js

import mongoose from 'mongoose'; // Usamos 'import' en lugar de 'require'

const { Schema, model } = mongoose;

const AcidezDornicSchema = new Schema(
  {
    numeroLeche: {
      type: Schema.Types.ObjectId,
      ref: 'Control',
    },
    m1: Number,
    m2: Number,
    m3: Number,
    prom: Number,
    fact: Number,
    resultado: Number,
    obs: {
      type: String,
      default: 'NA',
    },
  },
  {
    timestamps: true, // Esto agrega automáticamente 'createdAt' y 'updatedAt'
  }
);

export default model('AcidezDornic', AcidezDornicSchema); // Usamos 'export default' en lugar de 'module.exports'
