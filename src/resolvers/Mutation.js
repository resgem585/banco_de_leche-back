// src/resolvers/Mutation.js
const User = require('../models/User');

const Mutation = {
  createUser: async (_, { email, password, isAdmin = false }) => {
    const user = new User({ email, password, isAdmin });
    await user.save();
    return user;
  },
};

module.exports = Mutation;
