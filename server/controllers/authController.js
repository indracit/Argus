const bcrypt = require('bcrypt');
const { logger } = require('../middlewares/logger');
const User = require('../models/user');
const {accessTokenSecret,refreshTokenSecret} = require('../nodeAppConfig.json')
const jwt = require('jsonwebtoken');

const login = async (req,res) => {

    const {username,password} = req.body;

    if(!username || !password) {
        const message = {'message' : 'all field are required'};
        logger('info',message);
        return res.status(200).json(message);
    }

    const foundUser = await  User.findOne({username}).exec();

    if(!foundUser ){
        const message = {message : "User not found !"};
        logger('info',message);
        return res.status(200).json(message);
    }
    if(!foundUser.active){
        const message = {message : "User is not active !"};
        logger('info',message);
        return res.status(200).json(message);
    }

    const match = await bcrypt.compare(password,foundUser.password);
    
    if(!match){
        const message = {'message' : 'Invalid username or password!'};
        logger('info',message)
        return res.status(200).json(message);
    }

    const accessToken = jwt.sign({
        "UserInfo" :{
            "username" : foundUser.username,
            "roles" : foundUser.roles
        }
    },accessTokenSecret,{expiresIn : '15m'})

    const refreshtoken = jwt.sign({ "username": foundUser.username },
    refreshTokenSecret,
    { expiresIn: '7d' })

    res.cookie('jwt',refreshtoken,{
        httpOnly : true,
        // secure : false,
        // sameSite : 'None',
        maxAge : 7 * 24 * 60 * 60 * 1000
    })

    res.json({ accessToken })
}



const refresh = async(req,res) => {
    const cookies   = req.cookies
    // console.log(req);
    console.log(cookies);
    if(!cookies?.jwt) return res.status(401).json({message: 'Unauthorized'})
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken,refreshTokenSecret, async(err,decoded)=>{
        if(err) return res.status(403).json({message : 'Forbidden'})
        const foundUser = await User.findOne({username : decoded.username}).exec()
        if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": foundUser.roles
                }
            },
            accessTokenSecret,
            { expiresIn: '15m' }
        )

        res.json({ accessToken })
    })
}

const logout = async(req,res) => {
    const cookies = req.cookies
    // console.log(req);
    console.log(cookies);
    // if (!cookies?.jwt) return res.json({message: 'no cookies'}) //No content
    res.clearCookie('jwt','', {
        domain: 'localhost', path: '/' })
    
    res.json({ message: 'Cookie cleared' })
}

module.exports = {login,logout,refresh}
