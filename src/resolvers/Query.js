import User from '../models/User.js';
import Donante from '../models/Donante.js';
import bcrypt from 'bcrypt';

const Query = {
  users: async () => {
    return await User.find({});
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    return user;
  },

  donantes: async () => {
    return await Donante.find({});
  },

  donante: async (_, { id }) => {
    return await Donante.findById(id);
  },
};

export default Query;
