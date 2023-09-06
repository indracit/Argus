const { oracleDB } = require("../config/dbConfig");


module.exports = fetch = async (query)=> {
    const connection = await oracleDB();
    const result = await connection.execute(query);
    await connection.close();
    return result.rows;
}