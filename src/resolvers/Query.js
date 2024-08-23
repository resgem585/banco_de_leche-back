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

};

export default Query;

