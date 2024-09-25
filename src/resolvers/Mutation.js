import User from '../models/User.js';
import Donante from '../models/Donante.js';
import Control from '../models/Control.js';
import Crematocrito from '../models/Crematocrito.js';
import AcidezDornic from '../models/AcidezDornic.js'; // Importar el modelo AcidezDornic

const Mutation = {
  // USER
  async createUser(_, { email, password }) {
    const newUser = { email, password };
    const user = await User.create(newUser);
    return user;
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
    try {
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
  
      // Guardar el control en la base de datos
      await control.save();
  
      // Asignar el control al donante y actualizar el donante en la base de datos
      donante.control = control._id;
      await donante.save();
  
      // Devolver el control creado
      return control;
    } catch (error) {
      console.error('Error en createControl:', error);
      throw new Error(`Error creando control: ${error.message}`);
    }
  },

  updateControl: async (_, { id, input }) => {
    try {
      // Excluir donanteId si está vacío o no proporcionado
      if (!input.donanteId || input.donanteId === '') {
        delete input.donanteId;
      }
  
      const updatedControl = await Control.findByIdAndUpdate(id, input, { new: true });
      if (!updatedControl) {
        throw new Error('Control no encontrado');
      }
      return updatedControl;
    } catch (error) {
      console.error('Error actualizando control:', error);
      throw new Error(`Error actualizando control: ${error.message}`);
    }
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
  },

  // CREMATOCRITO
  createCrematocrito: async (_, { input }) => {
    try {
      const { numeroLeche, ...crematocritoData } = input;
  
      // Verificar si el control existe
      const control = await Control.findById(numeroLeche); // Asegúrate de que 'numeroLeche' contiene el ID del control
      if (!control) {
        throw new Error('Control no encontrado');
      }
  
      // Verificar si ya existe un crematocrito para este control
      const existingCrematocrito = await Crematocrito.findOne({ numeroLeche });
      if (existingCrematocrito) {
        throw new Error('Ya existe un crematocrito asociado a este control.');
      }
  
      // Crear el crematocrito
      const crematocrito = new Crematocrito({
        numeroLeche: control._id,  // Relación con el control
        ...crematocritoData,
      });
  
      // Guardar el crematocrito en la base de datos
      await crematocrito.save();
  
      return crematocrito;
    } catch (error) {
      console.error('Error en createCrematocrito:', error);
      throw new Error(`Error creando crematocrito: ${error.message}`);
    }
  },
  

  updateCrematocrito: async (_, { id, input }) => {
    try {
      const updatedCrematocrito = await Crematocrito.findByIdAndUpdate(id, input, { new: true });
      if (!updatedCrematocrito) {
        throw new Error('Crematocrito no encontrado');
      }
      return updatedCrematocrito;
    } catch (error) {
      console.error('Error actualizando crematocrito:', error);
      throw new Error(`Error actualizando crematocrito: ${error.message}`);
    }
  },

  deleteCrematocrito: async (_, { id }) => {
    const crematocrito = await Crematocrito.findByIdAndDelete(id);
    if (!crematocrito) {
      throw new Error('Crematocrito no encontrado');
    }

    return "Crematocrito eliminado con éxito";
  },

  // ACIDEZ DORNIC
  createAcidezDornic: async (_, { input }) => {
    try {
      const { numeroLeche, ...acidezDornicData } = input;

      // Verificar si el control existe
      const control = await Control.findById(numeroLeche); // 'numeroLeche' debe contener el ID del control
      if (!control) {
        throw new Error('Control no encontrado');
      }

      // Verificar si ya existe un registro de acidez dornic para este control
      const existingAcidezDornic = await AcidezDornic.findOne({ numeroLeche });
      if (existingAcidezDornic) {
        throw new Error('Ya existe un registro de acidez dornic asociado a este control.');
      }

      // Crear el registro de acidez dornic
      const acidezDornic = new AcidezDornic({
        numeroLeche: control._id, // Relación con el control
        ...acidezDornicData,
      });

      // Guardar el registro en la base de datos
      await acidezDornic.save();

      return acidezDornic;
    } catch (error) {
      console.error('Error en createAcidezDornic:', error);
      throw new Error(`Error creando acidez dornic: ${error.message}`);
    }
  },

  updateAcidezDornic: async (_, { id, input }) => {
    try {
      const updatedAcidezDornic = await AcidezDornic.findByIdAndUpdate(id, input, { new: true });
      if (!updatedAcidezDornic) {
        throw new Error('Acidez Dornic no encontrada');
      }
      return updatedAcidezDornic;
    } catch (error) {
      console.error('Error actualizando acidez dornic:', error);
      throw new Error(`Error actualizando acidez dornic: ${error.message}`);
    }
  },

  deleteAcidezDornic: async (_, { id }) => {
    const acidezDornic = await AcidezDornic.findByIdAndDelete(id);
    if (!acidezDornic) {
      throw new Error('Acidez Dornic no encontrada');
    }

    return "Acidez Dornic eliminada con éxito";
  },
};

export default Mutation;
