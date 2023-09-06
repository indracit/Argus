const mongoose = require('mongoose');
const oracledb = require('oracledb');

const oracleDB = async () => {
    return  await oracledb.getConnection({
        user          : "indrajit",
        password      : 'Indracit0',  
        connectString : "localhost/orcl"
    })}


const  mongoDB = async () =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

module.exports = {oracleDB,mongoDB}


