import User from '../models/User.js';
import Donante from '../models/Donante.js';
import Control from '../models/Control.js';

const Mutation = {
  // USER
  async createUser(_, { email, password }) {
    const newUser = { email, password };
    const user = await User.create(newUser);
    return user;  // Regresa solo el usuario creado
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

  // DONANTE
  createDonante: async (_, { input }) => {
    const donante = new Donante(input);
    await donante.save();
    return donante;
  },

  updateDonante: async (_, { id, input }) => {
    const donante = await Donante.findByIdAndUpdate(id, input, { new: true });
    if (!donante) {
      throw new Error('Donante no encontrado');
    }
    return donante;
  },

  deleteDonante: async (_, { id }) => {
    const donante = await Donante.findByIdAndDelete(id);
    if (!donante) {
      throw new Error('Donante no encontrado');
    }
    return "Donante eliminado con éxito";
  },

  // CONTROL
  createControl: async (_, { input }) => {
    const { donanteId, ...controlData } = input;

    // Verificar si el donante existe
    const donante = await Donante.findById(donanteId);
    if (!donante) {
      throw new Error('Donante no encontrado');
    }

    // Verificar si el donante ya tiene un control
    if (donante.control) {
      throw new Error('El donante ya tiene un control asignado.');
    }

    // Crear el control
    const control = new Control({
      ...controlData,
      donanteId: donanteId,
    });
    await control.save();

    // Asignar el control al donante
    donante.control = control._id;
    await donante.save();

    return control;
  },

  updateControl: async (_, { id, input }) => {
    const control = await Control.findByIdAndUpdate(id, input, { new: true });
    if (!control) {
      throw new Error('Control no encontrado');
    }
    return control;
  },

  deleteControl: async (_, { id }) => {
    const control = await Control.findByIdAndDelete(id);
    if (!control) {
      throw new Error('Control no encontrado');
    }

    // Desvincular el control del donante
    await Donante.findOneAndUpdate(
      { control: id },
      { $unset: { control: "" } }
    );

    return "Control eliminado con éxito";
  }
};

export default Mutation;
