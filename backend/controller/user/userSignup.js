const userModel = require("../../models/userModel")
var bcrypt = require('bcryptjs');


async function userSignupController(req,res){
    try{
        const {name,email,password} = req.body
        
            
            const user = await userModel.findOne({email})
            if(user){
                throw new Error("email already exists")
            }

        if(!email){
            throw new Error("Please Provide Email")
        }
        if(!name){
            throw new Error("Please Provide Name")
        }
        if(!password){
            throw new Error("Please Provide Password")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPasword = await bcrypt.hashSync(password, salt);


        if(!hashPasword){
            throw new Error("Password is not hashed")
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPasword

        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message: "User Created Successfully",
        })
    }
    catch(err){
        res.json({
            message: err.message || err ,
            error : true,
            success : false,
        })
        
    }
}
module.exports = userSignupController