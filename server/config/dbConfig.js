const mongoose = require('mongoose');
const oracledb = require('oracledb');
const mysql    = require('mysql');


const oracleDB = async () => {
    return  await oracledb.getConnection({
        user          : "indrajit",
        password      : 'Indracit0',  
        connectString : "localhost/orcl"
    })}


const  mongoDB = async () =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const mySqlDb =  async () => {
    return  await mysql.createConnection({
        host     : 'localhost',
        port : '3306',
        user     : 'root',
        password : 'Indracit@0',
        database : 'test'
        });
}

module.exports = {oracleDB,mongoDB,mySqlDb}


