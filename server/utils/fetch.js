const { oracleDB , mySqlDb} = require("../config/dbConfig");


const oracleFetch = async (query)=> {
    const connection = await oracleDB();
    const result = await connection.execute(query);
    await connection.close();
    return result.rows;
}

const mysqlFetch = async (query) => {
    try {
        const connection = await mySqlDb();
        return new Promise((resolve, reject)=>{
            connection.connect();
            connection.query(query,(error,results)=>{
                if(error) reject(error);
                connection.end();
                resolve(results)
            })
        });    
    }

    catch(e){
        console.log(e);
    }
}



module.exports = {oracleFetch,mysqlFetch}