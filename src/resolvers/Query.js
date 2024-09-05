import User from '../models/User.js';
import Donante from '../models/Donante.js';
import bcrypt from 'bcrypt';

const Query = {
  async getUser() {
    const users = await User.find()
    return users
},    

async login(_,{email,password} ) {
    const verifyUser = await User.findOne( { email, password } ); //
    console.log(verifyUser)
     return verifyUser
},

async donantes() {
  try {
    const donantes = await Donante.find({});
    return donantes;
  } catch (error) {
    throw new Error("Error al obtener donantes");
  }
},

// Resolver para obtener un donante por ID
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
}
};


export default Query;

