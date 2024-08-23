
import User from '../models/User.js';


const Mutation = {
    // USER
    async createUser(_, { email, password }) {
        const newUser = { email, password };
        const user = await User.create(newUser);
        return user; // Regresa el usuario recién creado
    },
};

export default Mutation;
