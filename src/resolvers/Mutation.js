import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Donante from '../models/Donante.js';

const Mutation = {
  createUser: async (_, { email, password, isAdmin = false }) => {
    const user = new User({ email, password, isAdmin });
    await user.save();
    return user;
  },

  createDonante: async (_, { input }) => {
    const donante = new Donante(input);
    await donante.save();
    return donante;
  },

  updateDonante: async (_, { id, input }) => {
    const donante = await Donante.findByIdAndUpdate(id, input, { new: true });
    return donante;
  },

  deleteDonante: async (_, { id }) => {
    await Donante.findByIdAndDelete(id);
    return "Donante eliminado con éxito";
  },
};

export default Mutation;
