const mongoose = require('mongoose');
// const validator = require('validator');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
//################ Define or Create Schema ################
registerSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "First Name Is Required!!"],
        unique: [true, "Username id already Present !!"],
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },

    pass: {
        type: String,
        required: [true, "Password Is Required!!"],

    },

    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true
    //     }
    // }]
});

// ################ Define Midleware For Jwt OAuth ################
// registerSchema.methods.generateOAuthToken = async function(){
//     try {
//         const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         return token;
//     } catch (error) {
//         throw error;
//     }
// }

// ################ Define Midleware For Hashing Password ################
registerSchema.pre('save', async function (next) {
    if (this.isModified('pass')) {
        // console.log(`Without Hashing : ${this.password}`);
        this.pass = await bcrypt.hash(this.pass, 12);
        // console.log(`With Hashing : ${this.password}`);
        next();
    }
});

// ################ Define Model or Collections Creation ################
const Register = new mongoose.model("Register", registerSchema);

module.exports = Register;

// ####### Bcrypt Pass Technique #######
/*const securePassword = async(password)=>{
    // For Hashing
   const passhass = await  bcrypt.hash(password,12);
   console.log(passhass);
    //Compare
   const passCheck = await bcrypt.compare(password,'$2b$12$rEfnk/.UFKz/eRxZOW2LOOc8na/CVG.zp1yiYqZk30u2ENJ6FiS..');
   console.log(passCheck);
}*/
// securePassword("Nik")