
import User from '../models/User.js';


const Mutation = {
    // USER
   // USER
   async createUser(_, {email, password }){
    const newUser = { email, password}
    const user = await User.create( newUser )
    return await User.find() // puede ser solo user, regresar el usuario.
},
async updateUser(_, { _id, email, password } ){
    return await User.findByIdAndUpdate(_id, { email, password, }, {new: true})
},
async deleteUser( _, {_id}){
    const user = await User.findByIdAndDelete(_id);
    if(!user){
        
     throw new Error('User not found');
    }
    return user

}
}

export default Mutation;
