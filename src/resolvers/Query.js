import User from '../models/User.js';
import Donante from '../models/Donante.js';
import Control from '../models/Control.js';
import Crematocrito from '../models/Crematocrito.js';

const Query = {
  // USER
  async getUser() {
    const users = await User.find();
    return users;
  },

  async login(_, { email, password }) {
    const verifyUser = await User.findOne({ email, password });
    console.log(verifyUser);
    return verifyUser;
  },

  // DONANTE
  async donantes() {
    try {
      const donantes = await Donante.find({});
      return donantes;
    } catch (error) {
      throw new Error('Error al obtener donantes');
    }
  },

  async donante(_, { id }) {
    try {
      const donante = await Donante.findById(id);
      if (!donante) {
        throw new Error('Donante no encontrado');
      }
      return donante;
    } catch (error) {
      throw new Error('Error al obtener el donante');
    }
  },

  // CONTROL
  async controles() {
    try {
      const controles = await Control.find({});
      return controles;
    } catch (error) {
      throw new Error('Error al obtener los controles');
    }
  },

  async control(_, { id }) {
    try {
      console.log('ID recibido en el resolver control:', id);
      const control = await Control.findById(id);
      if (!control) {
        throw new Error('Control no encontrado');
      }
      return control;
    } catch (error) {
      console.error('Error en el resolver control:', error);
      throw new Error('Error al obtener el control');
    }
  },

  async controlPorDonante(_, { donanteId }) {
    try {
      const control = await Control.findOne({ donanteId }); // Suponiendo que solo puede haber un control por donante
      if (!control) {
        throw new Error('Control no encontrado para este donante');
      }
      return control;
    } catch (error) {
      throw new Error('Error al obtener el control del donante');
    }
  },

  // CREMATOCRITO
  async crematocritos() {
    try {
      const crematocritos = await Crematocrito.find({}).populate('numeroLeche'); // Populate para mostrar el control asociado
      return crematocritos;
    } catch (error) {
      throw new Error('Error al obtener los crematocritos');
    }
  },

  async crematocrito(_, { id }) {
    try {
      console.log('ID recibido en el resolver crematocrito:', id);
      const crematocrito = await Crematocrito.findById(id);
      if (!crematocrito) {
        throw new Error('Crematocrito no encontrado');
      }
      return crematocrito;
    } catch (error) {
      console.error('Error en el resolver crematocrito:', error);
      throw new Error(`Error al obtener el crematocrito: ${error.message}`);
    }
  }
};

export default Query;
