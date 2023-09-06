const { oracleDB } = require("../config/dbConfig");
const transform = require('./transform');

module.exports = fetch = async (query)=> {
    const connection = await oracleDB();
    const result = await connection.execute(query);
    await connection.close();
    return transform(result.rows);
}