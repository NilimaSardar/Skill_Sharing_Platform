const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res)=>{
    try{
        res.status(200).send("welcome from controllers");
    }catch(error){
        console.log(error);
    }
}
//user register logic
const register = async (req, res)=>{
    try{
        // console.log(req.body);

        const {username, email, phone, password} = req.body;

        const userExist = await User.findOne({email: email});

        if(userExist){
            return res.status(400).json({message: "email already exists"});
        }

        // //hash password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);
        
        // const userCreated = await User.create({username, email, phone, password: hash_password});

        const userCreated = await User.create({username, email, phone, password});

        res
            .status(201)
            .json({
                message: "registration successfull", 
                token: await userCreated.generateToken(), 
                userId: userCreated._id.toString(), 
            });
    }catch(error){
        res.ststus(500).json("internal server error");
    }
};

//user login logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        console.log(userExist);
        

        if(!userExist){
            return res.status(400).json({message: "Invalid credentials"});
        }

        // const isPasswordValid = await bcrypt.compare(password,userExist.password);

        const isPasswordValid = await userExist.comparePassword(password);

        
        if(isPasswordValid){
            res
            .status(200)
            .json({
                message: "login successfull", 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString(), 
            });
        }else{
            res.status(401).json({message: "Invalid email or password"});
        }
        
    } catch (error) {
        res.ststus(500).json("internal server error");
    }
}

// to send user data - user logic
const user = async (req, res) =>{
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`error from the user route ${error}`);
        
    }
}

module.exports = { home, register, login, user };