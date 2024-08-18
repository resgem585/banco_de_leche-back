const bcrypt = require('bcrypt');
const User = require('../models/User');

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

    // Retornar el usuario si la autenticación es exitosa
    return user;
  },
};

module.exports = Query;