import User from '../models/User.js';
import Donante from '../models/Donante.js'; 

const Mutation = {
  // USER
  async createUser(_, { email, password }) {
    const newUser = { email, password };
    const user = await User.create(newUser);
    return await User.find(); // puede ser solo user, regresar el usuario.
  },

  async updateUser(_, { _id, email, password }) {
    return await User.findByIdAndUpdate(_id, { email, password }, { new: true });
  },

  async deleteUser(_, { _id }) {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  // Donante
  createDonante: async (_, { input }) => {
    const donante = new Donante(input);
    await donante.save();
    return donante;
  },

  updateDonante: async (_, { id, input }) => {
    const donante = await Donante.findByIdAndUpdate(id, input, { new: true });
    return donante;
  },

  deleteDonante: async (_, { _id }) => {
    const donante = await Donante.findByIdAndDelete(_id); // Cambié `id` por `_id`
    if (!donante) {
      throw new Error('Donante no encontrado');
    }
    return "Donante eliminado con éxito";
  },
};

export default Mutation;