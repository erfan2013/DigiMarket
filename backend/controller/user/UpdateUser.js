const userModel = require("../../models/userModel");




async function updateUser(req,res) {
    try{

        const sessionUser  = req.userId

        const {userId,name , email,role} = req.body

        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role}),
        }

        const user = await userModel.findById(sessionUser)

        const updateUser = await userModel.findByIdAndUpdate(userId,payload)

        res.status(200).json({
            data: updateUser,
            error: false,
            success: true,
            message: "User Updated Successfully",
            });

    }catch(err){
        res.status(400).json({ 
            message: err.message || err ,
            error: true ,
            success: false
            });
    }
}

module.exports = updateUser