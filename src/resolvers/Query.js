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
      const control = await Control.findById(id).populate('crematocritoData');
      if (!control) {
        throw new Error('Control no encontrado');
      }
      return control;
    } catch (error) {
      console.error('Error en el resolver control:', error);
      throw new Error('Error al obtener el control');
    }
  },


  // CREMATOCRITO
  async crematocritos() {
    try {
      const crematocritos = await Crematocrito.find({}).populate('numeroLeche'); // Poblamos el campo 'numeroLeche'
      return crematocritos;
    } catch (error) {
      throw new Error('Error al obtener los crematocritos');
    }
  },

  async crematocrito(_, { id }) {
    try {
      const crematocrito = await Crematocrito.findById(id).populate('numeroLeche');
      if (!crematocrito) {
        throw new Error('Crematocrito no encontrado');
      }
      return crematocrito;
    } catch (error) {
      console.error('Error al obtener el crematocrito:', error);
      throw new Error('Error al obtener el crematocrito');
    }
  },
};

export default Query;
