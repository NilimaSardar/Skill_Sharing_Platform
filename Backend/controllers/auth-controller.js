const User = require("../models/users-model");
const bcrypt = require("bcryptjs");

const home = async (req, res)=>{
    try{
        res.status(200).send({message: "welcome from controllers"});
    }catch(error){
        console.log(error);
    }
}
//user register logic
const register = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      // hash password
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(password, saltRounds);
  
      const newUser = await User.create({ email, password_hash });
  
      return res.status(201).json({
        message: "User registered successfully",
        token: await newUser.generateToken(),
        userId: newUser._id.toString(),
      });
  
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ message: "Internal server error" });
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
        res.status(500).json("internal server error");
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