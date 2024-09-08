import User from '../models/User.js';
import Donante from '../models/Donante.js';
import Control from '../models/Control.js';

const Query = {
  async getUser() {
    const users = await User.find();
    return users;
  },

  async login(_, { email, password }) {
    const verifyUser = await User.findOne({ email, password });
    console.log(verifyUser);
    return verifyUser;
  },

  async donantes() {
    try {
      const donantes = await Donante.find({});
      return donantes;
    } catch (error) {
      throw new Error("Error al obtener donantes");
    }
  },

  // Resolver para obtener un donante por ID
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

  // Obtener todos los controles
  async controles() {
    try {
      const controles = await Control.find({});
      return controles;
    } catch (error) {
      throw new Error("Error al obtener los controles");
    }
  },

  // Obtener el control de un donante por su ID
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
  }
};

export default Query;
