const express = require('express');
const {port}  = require('./nodeAppConfig.json');
const {reqLogger,logger} = require('./middlewares/logger');
const {mongoDB} = require('./config/dbConfig');
const mongoose = require('mongoose');
var cors = require('cors')
const verifyJWT = require('./middlewares/verifyJwt')
var cookieParser = require('cookie-parser')
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'dist')));

mongoDB()
.catch(err => logger('error',`${err.message}`));

var whitelist = ['http://localhost:5173','http://localhost:3000']
var corsOptions = {
  
  origin: function (origin, callback) {
    // console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
      // callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(reqLogger); 

app.use('/',require('./routes/authRoute'));
app.use('/user',verifyJWT,require('./routes/userRoute'))
app.use('/app',require('./routes/appRoute'))

mongoose.connection.once('open', () => {
    logger('info',{message:'mongodb connected'});
})
mongoose.connection.on('error', err => {
    logger('error',{message:err.message})
});

app.listen(port,() => {
    logger('info',{message:`server listening in port ${port}`});

})