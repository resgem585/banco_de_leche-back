const User = require('../models/User');

const Query = {
  users: async () => {
    return await User.find({});
  },
};

module.exports = Query;
