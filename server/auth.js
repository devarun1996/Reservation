require("dotenv").config();

const Owners = require("./ownerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
const ownerRegister = async (ownerData, res) =>{
    
    try{
        // validate username
        let owner = await Owners.findOne({userName: ownerData.userName});
        if(owner){
            return res.status(400).json({
                message: "Username already exists",
                success: false
            });
        }

        // hashed password
        const hashedPassword = await bcrypt.hash(ownerData.password, 12);

        //create a new user
        const newOwner = new Owners({
            ...ownerData,
            password: hashedPassword
        });
        await newOwner.save();
    
        return res.status(201).json({
            message: "Logged in",
            success: true
        });
    }catch(err)
    {
        res.json({
            message: err.meessage
        })
    }
};

//login
const ownerLogin = async (ownerCreds, res) =>{
    let {userName, password} = ownerCreds;
    try{
        
        const owner = await Owners.findOne({userName}); 
      
        //check name
        if(!owner){
            res.status(404).json({
                message: "Invalid username!",
                success: false
            });
        }

    //check password
    let isMatch = await bcrypt.compare(password, owner.password);
    if(isMatch){

        //sign in and send token to user
        let token = jwt.sign(
            { owner_id: owner._id, name: owner.name, userName: owner.userName },
            process.env.SECRET,
            {expiresIn: "7 days"}
        );

        let result = {
            owner_id: owner._id,
            name: owner.name,
            userName: owner.userName,
            restaurant: owner.restaurant,
            token: `Bearer ${token}`,
            expiresIn: 168 //hours
        }

        return res.status(200).json({
            ...result,
            message: "You are logged in",
            success: true
        });
    }
    else{
        res.status(404).json({
            message: "Invalid password!",
            success: false
        }); 
    }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

//middleware verify token
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(token == null)
        return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET, (err, user)=>{
        if(err)
            return res.sendStatus(403);

        //req.user = user;
        next();
    })
}

module.exports = {
    ownerRegister,
    ownerLogin,
    authenticateToken
};