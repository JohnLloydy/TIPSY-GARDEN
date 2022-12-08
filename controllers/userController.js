import User from "../models/userModel.js";

//for login
export const loginController = async (req, res) => {
    try {

        const {email, password} = req.body;
    const user = await User.findOne({email, password, verified: true});
        if(user) {
            res.status(200).send(user);
        } else {
            res.json({
                message: "Login Failed",
                user,
            });
        }
        
        
    } catch (error) {
        console.log(error);
    }
}
// for register
export const registerController = async (req, res) => {
    try {

        const newUser = new User({...req.body, verified: true});
        await newUser.save();
        res.status(200).send("New User Added Created Successfully!");
        
        
    } catch (error) {
        console.log(error);
    }
}

