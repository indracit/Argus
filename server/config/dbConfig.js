const mongoose = require('mongoose');
const oracledb = require('oracledb');
const mysql    = require('mysql');


const oracleDB = async () => {
    return  await oracledb.getConnection({
        user          : "ITGMIS",
        password      : 'itgmis_1234',  
        connectString : "10.100.71.121:1584/fimis"
    })}


const  mongoDB = async () =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const mySqlDb =  async () => {
    return  await mysql.createConnection({
        host     : '10.100.66.7',
        port : '3307',
        user     : 'integra',
        password : 'Integra@123',
        database : 'iss_ibfi_prod'
        });
}

module.exports = {oracleDB,mongoDB,mySqlDb}


